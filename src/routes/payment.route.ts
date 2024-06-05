import { Request, Response, Router } from "express";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config";

const route = Router();
const stripe = new Stripe(STRIPE_SECRET_KEY);

const image_url =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D";

route.get("/create-checkout-session", async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 2000, //20$ * 100 => cent
          product_data: {
            name: "Product - 1",
            description: "Great product",
            images: [image_url],
            metadata: {
              id: 120,
            },
          },
        },
        quantity: 2,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:8080/payment/checkout-success",
    cancel_url: "http://localhost:8080/payment/checkout-failed",
  });

  const redirectUrl = session.url || "";
  return res.redirect(redirectUrl);
});

route.get("/checkout-success", (req: Request, res: Response) => {
  return res.status(200).send("Checkout success 🚀🚀🚀");
});

route.get("/checkout-failed", (req: Request, res: Response) => {
  return res.status(200).send("Checkout success 🚀🚀🚀");
});

export default route;
