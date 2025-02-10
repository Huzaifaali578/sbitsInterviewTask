import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function SignUp(req, res) {
    try {
        const { name, email, password } = req.body;
        // check email is already exist
        console.log(name, email, password)
        const checkUser = await userModel.findOne({ email });
        // if user exist
        if (checkUser) {
            return res.status(400).json({
                message: "user is already exist please signIn",
                success: false
            });
        }
            // if user not exist hashed password
            const hashedPassword = await bcrypt.hash(password, 10);

            const payload = {
                name,
                email,
                password: hashedPassword
            }

            // save user to data base
            const user = new userModel(payload);
            const userSaved = await user.save();

            res.status(201).json({
                message: "user created successfully",
                data: userSaved,
                success: true
            })

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

export async function SignIn(req, res) {
    try {
        const { email, password } = req.body;
        // check user
        const user = await userModel.findOne({ email });

        // if user not exit
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            })
        };

        const hashedPassword = user.password;
        // compare password
        const confirmPassword = bcrypt.compare(password, hashedPassword);

        if (!confirmPassword) {
            res.status(400).json({
                message: "wrong password",
                success: false
            })
        };

        // JWT token
        const tokenData= {
            id: user._id,
        }

        const secretKey = process.env.JWT_SECRET_KEY
        const token = jwt.sign(tokenData, secretKey, { expiresIn: "1d" });

        res.cookie("token", token, { httpOnly: true }).status(200).json({
            message: "SignIn SuccessFull",
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}

export async function SignOut(req, res) {
    try {
        // Destroy session 
        req.session.destroy((error) => {
            if (error) {
                res.status(500).json({
                    message: "SignOut failed",
                    success: true
                })
            };

            res.clearCookie("token");
            res.clearCookie("connect.sid");
            return res.status(200).json({
                message: "SignOut Successfully",
                success: true
            })
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}