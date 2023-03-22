import mongoose from "mongoose";

const AdministratorSchema = new mongoose.Schema(
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
      required: true,
      min: 5,
    },
    role: {
        type: String,
        enum: ["admin", "superadmin"],
        default: "admin",
    },
    userId: Array
  },
  { timestamps: true }
);

const Administrator = mongoose.model("Administrator", AdministratorSchema);
export default Administrator;
