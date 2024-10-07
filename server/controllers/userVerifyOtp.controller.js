import otpcenter from "../models/otp.model.js"
import jwt from 'jsonwebtoken'
const userVerifyOtp = async (req, res) => {
	const { userOtp } = req.body

	console.log(userOtp)
	try {
		const id = req.id
		const {email, otp } = await otpcenter.findOne({ _id: id })
		// console.log(otp)
		if (otp === userOtp) {
			const payLoad = { email }
			const verifyToken = jwt.sign(payLoad, process.env.JWT_SECRET_KEY, { expiresIn: "5m" });
			// console.log(verifyToken);
			res.clearCookie("verifyOtpToken")
			res.cookie("verifyResetToken", verifyToken, {
				httpOnly: true,
				secure: false, // set secure to true during production
				maxAge: 300000,
				sameSite: "Strict",
				path: '/resetpassword'
			})
			return res.status(200).json({ message: "Verified Successfully." })
		} else {
			return res.status(400).json({ message: "Invalid OTP" })
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred", error: error.message })
	}
}

export default userVerifyOtp
