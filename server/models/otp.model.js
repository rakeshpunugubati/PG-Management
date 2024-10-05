import mongoose from "mongoose"
const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
		expires: 300,
	},
})

const otpcenter = mongoose.model("otpcenter", userSchema)
export default otpcenter
