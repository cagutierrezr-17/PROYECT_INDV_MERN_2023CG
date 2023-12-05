import mongoose from "mongoose";

// modelo establecido para el usuario.
const UserStoreSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthDate: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    addressDetail: String,
    city: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserStore = mongoose.model("user-store", UserStoreSchema);
export default UserStore;
