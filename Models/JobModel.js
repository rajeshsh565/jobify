import mongoose from "mongoose";
import { JobStatus, JobType } from "../utils/constants.js";

const jobs = new mongoose.Schema({
    company: String,
    position: String,
    jobLocation: {
      type: String,
      default: "my city",
    },
    jobStatus: {
      type: String,
      enum: Object.values(JobStatus),
      default: JobStatus.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JobType),
      default: JobType.FULL_TIME,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Jobs", jobs);
