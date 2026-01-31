import express from "express";
import {
  createOrder,
  deleteOrder,
  getCustomerOrders,
  updateOrder,
} from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/add-order", createOrder);
router.get("/get-my-orders/:customerId", getCustomerOrders);
router.put("/update-order/:orderId", updateOrder);
router.delete("/delete-order/:orderId", deleteOrder);

export default router;
