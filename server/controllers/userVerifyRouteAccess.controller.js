import jwt from "jsonwebtoken"

const verifyRouteAccess = async (req, res) => {
    
	const token = req.cookies.verifyOtpToken || req.cookies?.verifyResetToken
    
	// Check if token exists
	if (!token) {
		return res.status(403).json({ message: "Token expired or Unauthorized access" })
	}

	try {
		await jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.status(200).json({message: "You have access to this route"});
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(403).json({message: "Token has expired, please request a new OTP",})
		} else if (error.name === "JsonWebTokenError") {
			return res.status(403).json({ message: "Invalid token" })
		}

		return res.status(500).json({ message: "An error occurred", error: error.message })
	}
}

export default verifyRouteAccess
