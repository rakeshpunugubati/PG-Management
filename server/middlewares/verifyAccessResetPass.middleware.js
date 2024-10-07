import jwt from "jsonwebtoken"

const verifyAccessToken = (cookieName) => {
	return async (req, res, next) => {
		const token = req.cookies[cookieName]

		if (!token) {
			console.log("Token Expired or Invalid authorization")
			return res
				.status(401)
				.json({ message: "Token Expired or Invalid authorization" })
		}

		try {
			const { id, email } = await jwt.verify(
				token,
				process.env.JWT_SECRET_KEY
			)
			if (id) {
				req.id = id
				console.log("req.id", req.id)
			}
			if (email) {
				req.email = email
				console.log("req.email", req.email)
			}

			next()
		} catch (error) {
			return res.status(401).json({message: "Token has expired, please request a new OTP"})
		}
	}
}

export default verifyAccessToken
