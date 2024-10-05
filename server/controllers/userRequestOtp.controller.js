import logincredentials from "../models/user.model.js"
import otpcenter from "../models/otp.model.js"
import createToken from "../utils/tokenUtils.js"
import sendMail from "../utils/nodemailer.js"

const userRequestOtp = async (req, res) => {
	try {
		const { email } = req.body
		const exist = await logincredentials.exists({ email })
		console.log(`exist: ${exist._id}`)
		if (exist) {
			const otp = generateOtp()
			const otpexist = await otpcenter.exists({ email })
			// console.log(otpexist)
			if (otpexist) {
				const id = otpexist._id
				console.log(`otpexist: ${id}`)

				const updatedOpt = await otpcenter.updateOne(
					{ _id: id },
					{ $set: { otp, createdAt: Date.now() } }
				)
				console.log(updatedOpt)
				const payLoad = { id: updatedOpt._id }
				const verifyToken = createToken(payLoad)
				// console.log(verifyToken);
				res.clearCookie("verifyToken")
				res.cookie("verifyToken", verifyToken, {
					httpOnly: true,
					secure: false, // set secure to true during production
					maxAge: 300000,
					sameSite: "Lax",
				})
			} else {
				const otpcreated = await otpcenter.create({ email, otp })
				console.log(otpcreated)
				const payLoad = { id: otpcreated._id }
				const verifyToken = createToken(payLoad)
				// console.log(verifyToken);
				res.cookie("verifyToken", verifyToken, {
					httpOnly: true,
					secure: false, // set secure to true during production
					maxAge: 300000,
					sameSite: "Lax",
				})
			}
			const info = await sendMail(email, otp)
			console.log(info)
			return res.status(200).json({ message: "OTP created successfully" })
		} else {
			return res.status(404).json({ message: "User does not exist" })
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: "Error creating OTP",
			error: error.message,
		})
	}
}

const generateOtp = () => {
	let otp = ""
	for (let i = 0; i < 6; i++) {
		otp += Math.floor(Math.random() * 10)
	}
	return otp
}


export default userRequestOtp
