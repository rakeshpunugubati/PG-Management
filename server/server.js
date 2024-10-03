const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const logincredentials = require("./models/user.model.js")
const otpcenter = require("./models/otp.model.js")
const app = express()
const nodemailer = require("./utils/nodemailer.js")
const sendMail = require("./utils/nodemailer.js")
mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.post("/", (req, res) => {
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
})

app.post("/register", async (req, res) => {
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
})

app.post("/sendotp", async (req, res) => {
	try {
		const { email } = req.body
		const exist = await logincredentials.findOne({ email })
		console.log(exist)
		if (exist) {
			const otp = generateOtp()
			const otpexist = await otpcenter.exists({ email })
			if (otpexist) {
				const updatedOpt = await otpcenter.updateOne({ email, otp })
				console.log(updatedOpt)
			} else {
				await otpcenter.create({ email, otp })
			}
			await sendMail(email, otp)
			return res.status(200).json({ message: "OTP created successfully" })
		} else {
			return res.status(404).json({ message: "User does not exist" })
		}
	} catch (error) {
		res.status(500).json({
			message: "Error creating OTP",
			error: error.message,
		})
	}
})

const generateOtp = () => {
	let otp = ""
	for (let i = 0; i < 6; i++) {
		otp += Math.floor(Math.random() * 10)
	}
	return otp
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
