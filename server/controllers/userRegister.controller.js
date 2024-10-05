import logincredentials from "../models/user.model.js"

const userRegister = async (req, res) => {
	console.log(req.body)

	try {
		const exist = await logincredentials.exists({ userId: req.body.userId })
		console.log(exist)
		if (exist) {
			return res.status(409).json({ message: "User already exists" })
		}
		const user = await logincredentials.create(req.body)
		res.status(201).json({ message: "User created successfully" })
	} catch (error) {
		res.status(500).json({
			message: "Error creating user",
			error: error.message,
		})
	}
}

export default userRegister
