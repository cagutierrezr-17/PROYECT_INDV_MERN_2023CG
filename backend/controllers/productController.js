import ProductStore from "../models/productModel.js";

const listProductStore = async (req, res) => {
  let productList = await ProductStore.find();
  res.status(200).json(productList);
};

export { listProductStore };
