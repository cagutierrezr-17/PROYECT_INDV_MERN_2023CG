import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: [],
  },
  {
    timestamps: true,
  }
);

const finalOrder = mongoose.model("order-stores", OrderSchema);

export default finalOrder;
