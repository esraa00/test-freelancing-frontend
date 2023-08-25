import express, { Request, Response } from "express";
require("dotenv").config();
const app = express();
const port = 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello!");
});

app.listen(port, () => {
  return console.log(
    `Express is listening at http://localhost:${process.env.PORT}`
  );
});
