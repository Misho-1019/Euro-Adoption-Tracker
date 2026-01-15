import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
import cookieParser from "cookie-parser";
import prisma from "./prisma.js";
import cors from "cors";
import { authMiddleware } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

(async () => {
  await prisma.$queryRaw`SELECT 1`;
  console.log("✅ Prisma Database connected successfully");
})();

app.use(router);
app.use(authMiddleware)

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
