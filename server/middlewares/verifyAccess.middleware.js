import jwt from 'jsonwebtoken';

const verifyAcess = async (req, res, next) => {
    const token = req.cookies.verifyOtpToken || req.cookies.verifyResetToken;
    
    // Check if token exists
    if (!token) {
        console.log("Token Expired or Invalid authorization")
        return res.status(403).json({ message: "Token Expired or Invalid authorization" });
    }

    try {
        // Verify the token
        const {id , email} = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if(req.cookies.verifyOtpToken){
            req.id = id;
        }
        else if(req.cookies.verifyResetToken){
            req.email = email;
        }
        
        console.log("reqid", req.id);
        console.log("reqemail", req.email);

        // Proceed to the next middleware or route
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            console.log(error.message);
            return res.status(403).json({ message: "Token has expired, please request a new OTP" });

        } else if (error.name === "JsonWebTokenError") {
            console.log(error.message);
            return res.status(403).json({ message: "Invalid token" });
        }else{
            console.log(error.message);
            return res.status(500).json({ message: "An error occurred", error: error.message });
        }
        
        
    }
}

export default verifyAcess;
