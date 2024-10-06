import mongoose from "mongoose"
const userSchema = mongoose.Schema({
	propertyName: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
		unique: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},
})

const logincredentials = mongoose.model("logincredentials", userSchema)
export default logincredentials
