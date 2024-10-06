import logincredentials from "../models/user.model.js"

const userResetPassword = async (req, res) => {
	const { password } = req.body

	console.log(password)
	try {
		const email = req.email
		await logincredentials.updateOne({ email }, { $set: { password } })
        res.clearCookie("verifyResetToken", { path: "/resetpassword" })
        res.status(200).json({message: "Password Updated Successfully"});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred", error: error.message })
	}
}

export default userResetPassword
