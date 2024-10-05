import logincredentials from "../models/user.model.js"
const userLogin = (req, res) => {
	console.log(req.body)
	const { userId, password } = req.body
	const getUser = async (userId) => {
		try {
			const user = await logincredentials.exists({ userId })
			if (!user) {
				return res.status(404).json({ message: "User does not exist" })
			}
		} catch (error) {
			console.error("Error finding user", error)
			res.status(500).json({
				message: "Error Finding user",
				error: error.message,
			})
		}
	}
	getUser(userId)
	// res.send('ehh')
}

export default userLogin
