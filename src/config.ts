import env from "dotenv";
env.config();

export const SERVER_PORT = process.env.PORT || 3000;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
