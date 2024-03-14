import {Router} from 'express'
import { getAllJobs, getJob, createJob, updateJob, deleteJob, showStats } from '../controllers/jobController.js'
import { checkTestUser, validateIdParams, validateJobInputs } from '../Middlewares/validationHandlerMiddleware.js';

const router = Router();
router.route("/").get(getAllJobs).post(checkTestUser,validateJobInputs, createJob);
router.route("/stats").get(showStats);
router.route("/id/:id").get(validateIdParams,getJob).patch(checkTestUser,validateIdParams,validateJobInputs, updateJob).delete(checkTestUser,validateIdParams,deleteJob);

export default router