import logincredentials from "../models/user.model.js"

const userRegister = async (req, res) => {
	console.log("Register form data: ", req.body)

	try {
		const userId = await logincredentials.exists({
			userId: req.body.userId,
		})
		console.log("User", userId)
		if (userId) {
			return res.status(409).json({ message: "UserId already exists" })
		}
		const email = await logincredentials.exists({ email: req.body.email })
		console.log("User", email)
		if (email) {
			return res.status(409).json({ message: "Email Id already exists" })
		}

		const user = await logincredentials.create(req.body)

		res.status(201).json({ message: "User created successfully" })
		console.log("User Created Successfully")
	} catch (error) {
		console.log(error.message)
		res.status(500).json({
			message: "An error occurred during registeration. Please try again.",
            error: "Internal Server Error",
		})
	}
}

export default userRegister
