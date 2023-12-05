import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  cantidad: Number,
  price: Number,
  category: String,
});

const ProductStore = mongoose.model("products-store", ProductSchema);
export default ProductStore;
