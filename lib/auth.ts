import { betterAuth } from  "better-auth"
import { organization, twoFactor } from "better-auth/plugins"
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {db} from "./db"

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    },

    plugins: [
        twoFactor(),
        organization(),
    ]
})


