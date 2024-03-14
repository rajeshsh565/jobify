import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import {
  validateLoginInputs,
  validateRegisterInputs,
} from "../Middlewares/validationHandlerMiddleware.js";
import rateLimiter from "express-rate-limit";

const router = Router();

const apiLimit = rateLimiter({
  windowMs: 1000 * 60 * 10,
  max: 10,
  message: { msg: "max requests limit exceeded." },
});

router.route("/register").post(apiLimit, validateRegisterInputs, register);
router.route("/login").post(apiLimit, validateLoginInputs, login);
router.route("/logout").get(logout);

export default router;
