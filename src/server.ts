import express, { Request, Response } from "express";
import { SERVER_PORT } from "./config";

const app = express();

app.get("/check_health", (req: Request, res: Response) => {
  return res.status(200).send(`Server working 🚀🚀🚀`);
});

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port ${SERVER_PORT} 🚀🚀!`)
);
