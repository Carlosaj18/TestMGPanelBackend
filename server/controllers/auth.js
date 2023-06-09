import User from "../models/User.js";
import Administrator from "../models/Administrator.js";
import mongoose from "mongoose";
import tryCatch from "./utils/tryCatch.js";
import bcrypt from "bcrypt";

/* REGISTER USER */
export const register = tryCatch(async (req, res) => {
  const {
    name,
    email,
    password,
    interests,
    phoneNumber,
    city,
    provinces,
    country,
    occupation,
  } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser)
    return res
      .status(400)
      .json({ success: false, message: "User already exists!" });

  let passwordHash = null;
  if (password) {
    const salt = await bcrypt.genSalt();
    passwordHash = await bcrypt.hash(password, salt);
  }

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password: password ? passwordHash : "",
    interests: interests && interests,
    phoneNumber: phoneNumber ? phoneNumber : "",
    city: city ? city : "",
    provinces: provinces && provinces,
    country: country ? country : "",
    occupation: occupation ? occupation : "",
  });

  Object.assign({}, newUser);
  const savedUser = await newUser.save();
  res.status(201).json({
    success: true,
    result: savedUser.email,
  });
});

export const registerAdmin = tryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  const existAdmin = await Administrator.findOne({ email: emailLowerCase });
  if (existedUser && existAdmin)
    return res
      .status(400)
      .json({ success: false, message: "User already exists!" });

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newAdmin = new Administrator({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password: passwordHash,
  });

  Object.assign({}, newAdmin);
  const savedAdmin = await newAdmin.save();
  res.status(201).json({
    success: true,
    result: savedAdmin.email,
  });
});
