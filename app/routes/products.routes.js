import express from "express";
import productsController from "../controllers/products.controller.js";
import auth from "../middleware/auth.js";

const productsRoute = (app) => {
  const products = productsController;
  const router = express.Router();

  router.get("/products", auth, products.getProducts);
  router.post("/products/add/:userID", auth, products.createProducts);

  app.use("/", router);
};

export default productsRoute;
