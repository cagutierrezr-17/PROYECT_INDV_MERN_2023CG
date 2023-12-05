import mongoose from "mongoose";

const createConnectMongo = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/turinconsabroso")
    .then(() => {
      console.log("conectado a la BD");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default createConnectMongo;
