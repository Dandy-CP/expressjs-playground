import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import exampleRoute from "./app/routes/example.routes.js";
import usersRoute from "./app/routes/users.routes.js";
import productsRoute from "./app/routes/products.routes.js";

const app = express();

const corsOptions = {
  origin: "*",
};

// Register cors middleware
app.use(cors(corsOptions));
app.use(express.json());

// Conection to Database
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(`Database Connection Failed: ${error}`), process.exit();
  });

// Main Routes
app.get("/", (req, res) => {
  res.send("Welcome To My Express Playground");
});

// Route Call
exampleRoute(app);
usersRoute(app);
productsRoute(app);

// Listen to PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
