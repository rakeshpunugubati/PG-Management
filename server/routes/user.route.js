import { Router } from "express";
import userLogin from "../controllers/userLogin.controller.js";
import userRegister from "../controllers/userRegister.controller.js";
import userVerifyOtp from "../controllers/userVerifyOtp.controller.js";
import userRequestOtp from "../controllers/userRequestOtp.controller.js";

const router = Router();

router.post( '/', userLogin);
router.post( '/register', userRegister);
router.post('/sendotp' , userRequestOtp);
router.get('/verifyotp', userVerifyOtp);

export default router;