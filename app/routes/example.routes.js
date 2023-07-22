import exampleControler from "../controllers/example.controller.js";
import express from "express";
import auth from "../middleware/auth.js";

const exampleRoute = (app) => {
  const example = exampleControler;
  const router = express.Router();

  router.get("/", auth, example.get);
  router.get("/:id", example.getQuery);
  router.post("/", example.post);
  router.put("/:id", example.put);
  router.delete("/:id", example.deleteData);

  app.use("/example", router);
};

export default exampleRoute;
