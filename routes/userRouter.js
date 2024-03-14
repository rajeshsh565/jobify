import { Router } from "express";
const router = Router();

import {
    getApplicationStats,
  getCurrentUser,
  updateUserInfo,
} from "../controllers/userController.js";
import { checkTestUser, validateUserUpdateInputs } from "../Middlewares/validationHandlerMiddleware.js";
import { authorizePermissions } from "../Middlewares/authorizePermissions.js";
import upload from "../Middlewares/multerMiddleware.js";

router.route("/current-user").get(getCurrentUser);
router.route("/admin/get-stats").get([authorizePermissions('admin'),getApplicationStats]);
router.route("/update-user").patch(checkTestUser, upload.single('avatar'),validateUserUpdateInputs, updateUserInfo);

export default router;
