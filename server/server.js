import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import router from "./routes/user.route.js"
import dotenv from "dotenv"
dotenv.config() 

const app = express()

mongoose.connect(process.env.MONGODB_URI)
const corseOptioins = {
	origin: "http://localhost:5173", // change domain during production
	credentials: true,
}
app.use(cors(corseOptioins))

app.use(express.json())

app.use(cookieParser())

app.use('/', router);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
