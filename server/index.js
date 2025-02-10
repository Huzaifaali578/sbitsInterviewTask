import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { connectWithMongoose } from "./config.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";
import { isAuth } from "./middleware/authMiddleware.js";

// creating server
dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {  httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 24 }
}));

app.use("/api", userRouter);
app.use("/api", isAuth, taskRouter);



app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listning on ${process.env.PORT} `);
    connectWithMongoose()
})


