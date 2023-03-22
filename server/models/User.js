import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    password: {
      type: String,
      required: false,
      min: 5,
    },
    interests: Array
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
