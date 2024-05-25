import express from "express";
import { placeOrder, getOrders } from "../controllers/orderController.js"; 

const  orderRouter = express.Router();

orderRouter.post("/place", placeOrder)
orderRouter.get("/list", getOrders)

export default orderRouter;