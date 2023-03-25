import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      max: 50,
      trim: true,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      min: 2,
      max: 50,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      min: 5,
      required: false,
    },
    interests: {
      type: "String",
      required: false,
      default: "Transporte",
      enum: ["Transporte", "Almacenamiento", "Asesoria"],
    },
    phoneNumber: {
      type: "String",
      required: false,
    },
    city: {
      type: "String",
      trim: true,
      required: false,
    },
    provinces: {
      type: "String",
      default: "Panama",
      enum: [
        "Panama",
        "Panama Oeste",
        "Colon",
        "Bocas del Toro",
        "Chiriqui",
        "Darien",
        "Veraguas",
        "Los Santos",
        "Cocle",
        "Herrera",
      ],
      required: false,
    },
    country: {
      type: "String",
      default: "Panama",
      required: false,
    },
    occupation: {
      type: "String",
      trim: true,
      required: false,
    },
    active: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
