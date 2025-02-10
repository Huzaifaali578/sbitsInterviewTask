import jwt from "jsonwebtoken";

export async function isAuth(req, res, next) {
    try {
        const token = req.cookies.token;

        // Check if token is missing
        if (!token) {
            return res.status(401).json({
                message: "Not authenticated",
                success: false
            });
        }

        const secretKey = process.env.JWT_SECRET_KEY;

        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    message: "Invalid token",
                    success: false
                });
            }


            req.userId = decoded.id; 
            next();
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            success: false
        });
    }
}
