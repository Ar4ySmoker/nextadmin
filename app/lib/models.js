import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    document: {
      type: String,
    },
    comment:{
      type:String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);
const candidateSchema = new mongoose.Schema({
  name: {
type: String,
  },
  phone:{
    type: String,
    required: true,
    unique: true,
  },
  location: {
    name: {type: String},
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  profession: {
    name: {type: String},
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profession'
  }
  
}
)

const locationSchema = new mongoose.Schema({
  name: {
type: String,
unique: true,
  }
}
)
const professionSchema = new mongoose.Schema({
  name: {
type: String,
unique: true,
  },
  description:{
    type: String
  }
}
)
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);
export const Profession = mongoose.models.Location || mongoose.model("Profession", professionSchema);

export const Candidate = mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);
