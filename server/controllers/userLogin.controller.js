import logincredentials from "../models/user.model.js"
import jwt from 'jsonwebtoken'
const userLogin = async (req, res) => {
	console.log(req.body)
	const { userId, password } = req.body

	try {
		const user = await logincredentials.findOne({ userId })
		console.log("User details: ", user)
		if (!user) {
			return res.status(404).json({ message: "User Not Found" })
		}
		if (user.password !== password) {
			return res.status(401).json({ message: "Incorrect Password" })
		}

		const payLoad = { userId: user.userId }

		const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
		res.clearCookie('userAccessToken');
		res.clearCookie('userRefreshToken');
		res.cookie("userAccessToken", accessToken, {
			httpOnly: true,
			secure: false, 
			maxAge: 900000,
			sameSite: "Strict",
			
		})
		const refreshToken = jwt.sign(payLoad, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
		
		res.cookie("userRefreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			maxAge: 86400000,
			sameSite: "Strict",
		});
		
		res.status(200).json({ message: "Successfully Loged In" })
	} catch (error) {
		console.error("Error finding user", error)
		res.status(500).json({
			message: "An error occurred during login. Please try again.",
            error: "Internal Server Error",
		})
	}
}

export default userLogin
