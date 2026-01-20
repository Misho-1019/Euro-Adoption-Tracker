import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
import cookieParser from "cookie-parser";
import prisma from "./prisma.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

(async () => {
  await prisma.$queryRaw`SELECT 1`;
  console.log("✅ Prisma Database connected successfully");
})();

app.use(router);
app.use(authMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
