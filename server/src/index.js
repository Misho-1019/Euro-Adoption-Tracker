import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express()

app.use(express.json());

app.use(cookieParser())
app.use(authMiddleware)

app.use(router)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
