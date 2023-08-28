import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route";
import errorHandling from "./middleware/error-handling.middleware";
import("../prisma/client");
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use(errorHandling);

app.listen(port, () => {
  return console.log(
    `Express is listening at http://localhost:${process.env.PORT}`
  );
});
