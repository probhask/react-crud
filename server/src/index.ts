import express, { Request, Response } from "express";
import { getFileData, saveFileData } from "./utils/fileOperation";

import { USER_DATA } from "../../client/src/type";
import UserRouter from "./routes/user";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());

// define  routes
app.get("/", (req: Request, res: Response) => {
  res.send("Server is Running...");
});
app.use("/user", UserRouter);

// 404 not found
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running on port ${process.env.PORT} ${process.env.BACKEND_URL}`
  );
});
