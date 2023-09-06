import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route";
import emailRoutes from "./routes/email.route";
import userRoutes from "./routes/user.route";
import errorHandling from "./middleware/error-handling.middleware";
import("../prisma/client");
import cors from "cors";
import * as env from "env-var";

const app = express();
const PORT: number = env.get("PORT").required().asIntPositive();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandling);

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
