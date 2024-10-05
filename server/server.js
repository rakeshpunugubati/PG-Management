const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const logincredentials = require("./models/user.model.js")
const otpcenter = require("./models/otp.model.js")
const app = express()
const sendMail = require("./utils/nodemailer.js")
const cookieParser = require("cookie-parser")

const createToken = require("./utils/tokenUtils.js")

mongoose.connect(process.env.MONGODB_URI)
const corseOptioins = {
	origin: "http://localhost:5173", // change domain during production
	credentials: true,
}
app.use(cors(corseOptioins))
app.use(express.json())
app.use(cookieParser())

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
					sameSite: 'Lax',
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
				})
			}
			// const info = await sendMail(email, otp)
			// console.log(info);
			return res.status(200).json({ message: "OTP created successfully" })
		} else {
			return res.status(404).json({ message: "User does not exist" })
		}
	} catch (error) {
		console.log(error.message)
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

app.post("/verifyotp", async (req, res) => {
	const { otp } = req.body
})

app.get("/verifyotp", async (req, res) => {
	
	if (!req.cookies["verifyToken"]) {
		return res.status(401).json({ message: "Unauthorized Action" })
	}

	res.status(200).send("you have access")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
