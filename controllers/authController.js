import { StatusCodes } from "http-status-codes";
import User from "../Models/UserModel.js";
import { UnAuthenticatedError } from "../Errors/customErrors.js";
import { hashPassword, verifyPassword } from "../utils/hashPasswords.js";
import { createToken } from "../utils/tokenUtil.js";

//Register Controller
export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created", user });
};
//Login Controller
export const login = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  //   if (!user) {
  //     throw new UnAuthenticatedError("incorrect login info");
  //   }
  //   const isCorrectPassword = await verifyPassword(
  //     req.body.password,
  //     user.password
  //   );
  //   if (!isCorrectPassword) {
  //     throw new UnAuthenticatedError("incorrect login info");
  //   }
  const isValidUser =
    user && (await verifyPassword(req.body.password, user.password));
  if (!isValidUser) throw new UnAuthenticatedError("incorrect login info");
  const token = createToken({ id: user._id, role: user.role });
  const oneDay = 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay * 3),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "login success" });
};


//Logout
export const logout = (req,res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  })
  res.status(StatusCodes.OK).json({msg : "logout success"});
}