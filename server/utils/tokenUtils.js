import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config() 

const secretKey = process.env.JWT_SECRET_KEY
const createToken = (userPayload) => {
	return jwt.sign(userPayload, secretKey, { expiresIn: "5m" })
}

// const refreshToken = (oldToken) =>{
//     const decoded = jwt.verify(oldToken, secretKey);

// }

export default createToken;
