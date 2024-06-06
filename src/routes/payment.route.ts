import express, { Request, Response, Router } from "express";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_KEY } from "../config";
import { createOrder } from "./order";

const route = Router();
const stripe = new Stripe(STRIPE_SECRET_KEY);

const image_url =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D";

route.get("/create-checkout-session", async (req: Request, res: Response) => {
  const cartItem = {
    productId: 125,
    name: "product-1",
  };
  const customer = await stripe.customers.create({
    metadata: {
      userId: 1245,
      cart: JSON.stringify(cartItem),
    },
  });

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
    customer: customer.id,
    mode: "payment",
    success_url: "http://localhost:8080/api/payment/checkout-success",
    cancel_url: "http://localhost:8080/api/payment/checkout-failed",
  });

  const redirectUrl = session.url || "";
  return res.redirect(redirectUrl);
});

route.get("/checkout-success", (req: Request, res: Response) => {
  return res.status(200).send("Checkout success 🚀🚀🚀");
});

route.get("/checkout-failed", (req: Request, res: Response) => {
  return res.status(200).send("Checkout failed 🚀🚀🚀");
});

route.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    ///
    const sig = req.headers["stripe-signature"] as string;
    let data;
    let eventType;

    //
    if (STRIPE_WEBHOOK_KEY) {
      try {
        const event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          STRIPE_WEBHOOK_KEY
        );
        console.log(`Webhook verified`);
        data = event.data.object;
        eventType = event.type;
      } catch (error) {
        console.log(`Webhook error ${error}`);
        return res.status(400).send(`Webhook error ${error}`);
      }
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    ///Event handler
    if (eventType === "checkout.session.completed") {
      const customer = await stripe.customers.retrieve(data.customer);
      const res = await createOrder(customer, data);
      console.log(res);
    }

    //return 200 ok
    res.status(200).end();
  }
);

export default route;
