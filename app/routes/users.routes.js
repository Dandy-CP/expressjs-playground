import usersController from "../controllers/users.controller.js";
import express from "express";

const usersRoute = (app) => {
  const users = usersController;
  const router = express.Router();

  router.get("/login", users.login);
  // router.get("/:id", users.getQuery);
  router.post("/register", users.signup);
  // router.put("/:id", users.put);
  // router.delete("/:id", users.deleteData);

  app.use("/", router);
};

export default usersRoute;
