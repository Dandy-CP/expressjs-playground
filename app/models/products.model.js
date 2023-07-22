import mongoose from "mongoose";

const products = () => {
  const schemaProducts = new mongoose.Schema(
    {
      user_id: String,
      name_product: String,
      price: String,
      description: String,
      image: String,
    },
    {
      timestamps: true,
    }
  );

  schemaProducts.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

  return mongoose.model("products", schemaProducts);
};

export default products;

// {
//   data: Buffer,
//   contentType: String,
// },
