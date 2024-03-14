import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../Errors/customErrors.js";
import { JobStatus, JobType } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../Models/JobModel.js";
import User from "../Models/UserModel.js";

const withValidationErrors = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => " " + error.msg);
        if (errorMessages[0].startsWith(" no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith(" not authorized")) {
          throw new UnAuthorizedError(errorMessages);
        } else throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateTest = withValidationErrors(
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name can not be empty")
    .isLength({ min: 5, max: 25 })
    .withMessage("only b/w 5 & 25 allowed")
);

export const validateJobInputs = withValidationErrors([
  body("company").trim().notEmpty().withMessage("company can not be empty"),
  body("position").trim().notEmpty().withMessage("position can not be empty"),
  body("jobStatus")
    .isIn(Object.values(JobStatus))
    .withMessage("invalid job status"),
  body("jobType").isIn(Object.values(JobType)).withMessage("invalid job type"),
]);

export const validateIdParams = withValidationErrors([
  param("id").custom(async (idValue, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(idValue);
    if (!isValid) {
      throw new Error("invalid MongoDB Id");
    }
    const job = await Job.findById(idValue);
    if (!job) throw new Error(`no job found with id: ${idValue}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.id === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnAuthorizedError("not authorized to access this route");
  }),
]);

export const validateRegisterInputs = withValidationErrors([
  body("name").notEmpty().withMessage("name can not be empty"),
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("enter valid email address")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("user already exist");
    }),
  body("password")
    .notEmpty()
    .withMessage("password can not be empty")
    .isLength({ min: 8 })
    .withMessage("password must be of minimum 8 characters"),
  body("lastName").notEmpty().withMessage("last name can not be empty"),
  body("location").notEmpty().withMessage("location can not be empty"),
]);

export const validateLoginInputs = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("enter valid email address"),
  body("password").notEmpty().withMessage("password can not be empty"),
]);

export const validateUserUpdateInputs = withValidationErrors([
  body("name").notEmpty().withMessage("name can not be empty"),
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("enter valid email address")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.id) {
        //if the user with input email already exist
        //and this already existing user should not be the same as
        //the user who is requesting this update. 
        throw new BadRequestError('email already exists!')
      };
    }),
  body("lastName").notEmpty().withMessage("last name can not be empty"),
  body("location").notEmpty().withMessage("location can not be empty"),
]);

export const checkTestUser = (req,res,next) => {
  if(req.user.testUser) {
    throw new BadRequestError("demo user. action not allowed!")
  }
  next();
}