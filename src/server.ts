import express, { Request, Response } from "express";
import { SERVER_PORT } from "./config";
import paymentRoute from "./routes/payment.route";

const app = express();
app.use(express.json());

app.get("/check_health", (req: Request, res: Response) => {
  return res.status(200).send(`Server working 🚀🚀🚀`);
});

app.use("/api/payment", paymentRoute);

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port ${SERVER_PORT} 🚀🚀!`)
);
