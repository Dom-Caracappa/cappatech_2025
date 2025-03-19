import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import dotenv from "dotenv";
import cors from "cors";
import connectRedis from "connect-redis"; // Function, not a class
import Redis from "ioredis";

// Extend Express User Type
declare global {
    namespace Express {
        interface User {
            id: string;
            username: string;
            displayName?: string;
            emails?: { value: string }[];
            photos?: { value: string }[];
        }
    }
}

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS (adjust origin as needed)
app.use(cors({
    origin: "https://admin.cappatech.net",
    credentials: true
}));

// Initialize Redis Client
const redisClient = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
});

// Initialize Redis Store for sessions
const RedisStore = connectRedis(session); // Function call

// Configure Session Middleware
app.use(session({
    store: new RedisStore({
        client: redisClient,
        disableTTL: false,
        logErrors: true
    }),
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production", // Secure in production
        httpOnly: true, // Prevents XSS attacks
        sameSite: "strict", // CSRF protection
        maxAge: 1000 * 60 * 60 * 24, // 1-day session
    },
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure GitHub OAuth
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
            callbackURL: "https://admin.cappatech.net/api/auth/callback",
        },
        (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: (error: any, user?: Express.User | false) => void
        ) => {
            const user = {
                id: profile.id,
                username: profile.username || profile.displayName || "unknown_user",
                displayName: profile.displayName || "No Name",
                emails: profile.emails || [],
                photos: profile.photos || [],
            };

            done(null, user);
        }
    )
);

// Serialize user
passport.serializeUser((user: Express.User, done) => {
    done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
    // Mocked user retrieval
    const user: Express.User = { id, username: "exampleUser" };
    done(null, user);
});

// Auth Routes
app.get("/api/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get("/api/auth/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("/admin");
    }
);

app.get("/api/auth/logout", (req, res) => {
    req.logout((err) => {
        if (err) console.error(err);
        res.redirect("/");
    });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Auth Server running on http://localhost:${PORT}`);
});
