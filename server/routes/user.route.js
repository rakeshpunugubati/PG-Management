import { Router } from "express"
import userLogin from "../controllers/userLogin.controller.js"
import userRegister from "../controllers/userRegister.controller.js"
import userVerifyOtp from "../controllers/userVerifyOtp.controller.js"
import userRequestOtp from "../controllers/userRequestOtp.controller.js"
import userVerifyRoute from "../controllers/userVerifyRoute.controller.js"
import userResetPassword from "../controllers/userResetpassword.controller.js"
import userAdmin from "../controllers/userAdmin.controller.js"
import verifyAccessToken from "../middlewares/verifyAccessResetPass.middleware.js"
import verifyAuthAccess from "../middlewares/verifyAuthAccess.middleware.js"

const router = Router()

router.post("/login", userLogin)

router.post("/register", userRegister)

router.post("/sendotp", userRequestOtp)

router.get("/verifyotp", userVerifyRoute("verifyOtpToken"))
router.post("/verifyotp", verifyAccessToken("verifyOtpToken"), userVerifyOtp)

router.get("/resetpassword", userVerifyRoute("verifyResetToken"))
router.post("/resetpassword", verifyAccessToken("verifyResetToken"), userResetPassword)

router.get("/admin", verifyAuthAccess, userAdmin)

export default router
