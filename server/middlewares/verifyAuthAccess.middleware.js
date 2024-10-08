import jwt from "jsonwebtoken";

const verifyAuthAccess = async (req, res, next) => {
    const accessToken = req.cookies.userAccessToken;
    const refreshToken = req.cookies.userRefreshToken;

    if (accessToken) {
        try {
            await jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
            return next(); 
        } catch (error) {
            console.log("Access token is invalid or expired:", error.message);
            res.clearCookie("userAccessToken");
            if (!refreshToken) {
                return res.status(401).json({ message: "Session has expired. Please log in again." });
            }
        }
    }

    if (refreshToken) {
        try {
            const payload = await jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

            const newAccessToken = jwt.sign({ userId: payload.userId }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
            
            res.cookie("userAccessToken", newAccessToken, {
                httpOnly: true,
                secure: false, // Set to true in production
                maxAge: 15 * 60 * 1000,
                sameSite: "Strict",
            });

            return next();
        } catch (error) {
            console.log("Refresh token is invalid or expired:", error.message);
            res.clearCookie("userRefreshToken");
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }
    }

    return res.status(401).json({ message: "Session expired. Please log in or Unauthorized Access" });
};

export default verifyAuthAccess;
