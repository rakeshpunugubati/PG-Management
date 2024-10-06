import { Router } from "express";
import userLogin from "../controllers/userLogin.controller.js";
import userRegister from "../controllers/userRegister.controller.js";
import userVerifyOtp from "../controllers/userVerifyOtp.controller.js";
import userRequestOtp from "../controllers/userRequestOtp.controller.js";
import verifyAcess from "../middlewares/verifyAccess.middleware.js";
import verifyRouteAccess from "../controllers/userVerifyRouteAccess.controller.js";
import userResetPassword from "../controllers/userResetpassword.controller.js";
const router = Router();

router.post( '/', userLogin);
router.post( '/register', userRegister);
router.post('/sendotp' , userRequestOtp);
router.get('/verifyotp', verifyRouteAccess);
router.post('/verifyotp',verifyAcess, userVerifyOtp);
router.post('/resetpassword',verifyAcess, userResetPassword);

export default router;