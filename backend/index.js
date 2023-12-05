import express from "express";
import cors from "cors";
import createConnectMongo from "./config/connectMongodb.js";
import * as userStoreRoutes from "./routes/userRoute.js";
import * as prodcutRoutes from "./routes/productRoutes.js";
import * as finalOderRoutes from "./routes/orderRoute.js";

const app = express();
app.use(express.json());

createConnectMongo();

app.use(cors());

app.use(userStoreRoutes.router);
app.use(prodcutRoutes.router);
app.use(finalOderRoutes.router);

app.listen(8000);
