// global.d.ts
import type * as express from "express";

declare global {
    namespace Express {
        // 🏆 Patch the definition of Request to include your body
        interface Request {
            body: {
                name: string;
                email: string;
                message: string;
            };
        }
    }
}
interface ImportMetaEnv {
    readonly PUBLIC_API_URL: string;
}


