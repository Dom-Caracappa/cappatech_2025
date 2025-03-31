// file: server/graphql/resolvers/formResolvers.mts

// import your db from drizzle, if needed
import { db } from "../../../docker/server/app/db/drizzle.mjs";
import { contactFormSubmissions } from "../../../docker/server/app/db/schema.js"; // or .mts if that’s the name

export default {
    Query: {
        getSubmissions: async () => {
            // Example Drizzle usage
            return await db.select().from(contactFormSubmissions);
        },
    },
    Mutation: {
        submitForm: async (_: any, { input }: { input: any }) => {
            // Insert data via Drizzle
            const { name, email, subject, message } = input;
            const result = await db
                .insert(contactFormSubmissions)
                .values({
                    name,
                    email,
                    subject,
                    message,
                    submittedAt: new Date().toISOString(),
                })
                .returning();
            return result[0];
        },
    },
};
