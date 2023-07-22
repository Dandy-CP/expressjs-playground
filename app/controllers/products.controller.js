import db from "../models/index.js";
const products = db.products;

const getProducts = (req, res) => {
  products
    .find()
    .then((data) => {
      res.status(200).json({
        message: "Success",
        status: 200,
        error: false,
        data,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Failed GET data",
        status: 500,
        error: false,
        node: error.message,
      });
    });
};

const createProducts = (req, res) => {
  const id = req.params.userID;

  const { name_product, price, description, image } = req.body;

  products
    .create({
      user_id: id,
      name_product,
      price,
      description,
      image,
    })
    .then((data) => {
      res
        .status(201)
        .json({ message: "Success", status: 201, error: false, data });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

export default { getProducts, createProducts };
