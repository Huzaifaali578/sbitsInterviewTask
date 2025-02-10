import express from "express";
import { SignIn, SignOut, SignUp } from "../controller/userController.js";

const userRouter = express.Router();

// signUp user
userRouter.post("/signup", SignUp);
// signIn user
userRouter.post("/signin", SignIn);
// signOut user
userRouter.get("/signout", SignOut);

export default userRouter;