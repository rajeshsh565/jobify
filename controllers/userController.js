import { StatusCodes } from "http-status-codes";
import Job from "../Models/JobModel.js";
import User from "../Models/UserModel.js";
import cloudinary from "cloudinary";
import {promises as fs} from "fs";
import { formatImage } from "../Middlewares/multerMiddleware.js";

export const getCurrentUser = async (req, res) => {
    const user = await User.findById({_id:req.user.id});
    const obj = user.toJSON();
    delete obj.password;
    // res.setHeader('Cache-Control', 'no-cache'); //disable cache for this particular route to get latest information
    res.status(StatusCodes.OK).json({user: obj})
};

export const getApplicationStats = async (req, res) => {
  const userCount = await User.countDocuments();
  const jobCount = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users: userCount, jobs: jobCount });
};

export const updateUserInfo = async (req, res) => {
  const obj = req.body;
  delete obj.password;
  if(req.file){
    const formattedImage = formatImage(req.file);
    const profile = await cloudinary.v2.uploader.upload(formattedImage);
    if(profile)
    obj.avatar = profile.url;
    obj.avatarPublicId = profile.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, obj);
  if(req.file && updatedUser.avatarPublicId){
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  } 
  res.status(StatusCodes.OK).json({ msg: "updated info successfully" });
};