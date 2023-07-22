import mongoose from "mongoose";
import dbConfig from "../config/database.js";
import exampleModel from "./example.model.js";
import users from "./users.model.js";
import products from "./products.model.js";

const indexModels = {
  mongoose,
  url: dbConfig.url,
  example: exampleModel(),
  users: users(),
  products: products(),
};

export default indexModels;
