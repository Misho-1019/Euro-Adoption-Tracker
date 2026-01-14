import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import prisma from "./prisma.js";

dotenv.config();

const app = express()

app.use(express.json());

(async () => {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Prisma Database connected successfully");
})();

app.use(cookieParser())
app.use(authMiddleware)

app.use(router)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
