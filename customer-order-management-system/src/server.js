import express from "express";
import "dotenv/config";

import customerRoutes from "./routes/customer.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(express.json());
app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
