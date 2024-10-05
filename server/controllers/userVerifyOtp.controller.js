import otpcenter from "../models/otp.model.js";
import jwt from 'jsonwebtoken'
const userVerifyOtp = async (req, res) => {
	const { userOtp } = req.body;
	const verifyaccess  = req.cookies?.verifyToken;
	console.log(verifyaccess);
	try{
		const {id} = jwt.verify(verifyaccess ,  process.env.JWT_SECRET_KEY )
		const {otp} = await otpcenter.findOne({id});
		if(userOtp === otp){
			res.status(200).json({message:"Entered Valid Information"})
		}else{
			return res.status(401).json({message:"Invalid Data"})
		}
	}
	catch(error){
		if (error.name === "TokenExpiredError") {
			return res.status(403).json({ message: "Token has expired, please request a new OTP" });
		} else if (error.name === "JsonWebTokenError") {
			return res.status(403).json({ message: "Invalid token" });
		}
		return res.status(500).json({ message: "An error occurred", error: error.message });
	}

}

export default userVerifyOtp
