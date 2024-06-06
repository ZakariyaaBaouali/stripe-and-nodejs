import env from "dotenv";
env.config();

export const SERVER_PORT = process.env.PORT || 3000;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
export const STRIPE_WEBHOOK_KEY = "";
//whsec_48e5a49421890aabc11f43c630e19aaa200e82b93dd4d329ccdc11cddf441ca5
