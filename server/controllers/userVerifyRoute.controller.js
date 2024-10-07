import jwt from "jsonwebtoken";

const userVerifyRoute = (tokenType) => {
    return async (req, res) => {
        const token = req.cookies[tokenType]; 

        if (!token) {
            return res.status(401).json({ message: "Token expired or Unauthorized access" });
        }

        try {
            await jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token
            return res.status(200).json({ message: "You are authorized " }); // Return success message
        } catch (error) {
            return res.status(401).json({ message: "Token has expired, please request a new OTP" });
        }
    };
};

export default userVerifyRoute;
