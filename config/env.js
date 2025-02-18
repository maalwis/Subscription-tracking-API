import { config } from "dotenv";

// Load environment variables from the correct file based on NODE_ENV
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// Export PORT and NODE_ENV for use in other parts of your app
export const {
    PORT,
    NODE_ENV,
    DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_KEY, ARCJET_ENV
} = process.env;
