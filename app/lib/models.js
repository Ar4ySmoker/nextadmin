const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId, // Добавлено поле id
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
    id: mongoose.Schema.Types.ObjectId, // Добавлено поле id
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

// Добавлено поле id в каждую схему

const candidateSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  professions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profession' }],
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
  dateBirt: { type: Date },
  email: { type: String },
  comment: { type: String },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  phone: { type: String },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
});

const managerSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  phone: { type: String },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
  partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

const partnerSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  lastName: { type: String },
  nameCompany: { type: String, required: true },
  phone: { type: String },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
});

const locationSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  // candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
  // partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }],
  // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

const statusSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
});

const professionSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
});

const documentSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  dateExp: { type: String },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
  partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }],
});

// Экспорт моделей
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export const Candidate = mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);
export const Manager = mongoose.models.Manager || mongoose.model("Manager", managerSchema);
export const Partner = mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
export const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);
export const Status = mongoose.models.Status || mongoose.model("Status", statusSchema);
export const Profession = mongoose.models.Profession || mongoose.model("Profession", professionSchema);
export const Document = mongoose.models.Document || mongoose.model("Document", documentSchema);
// export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);


