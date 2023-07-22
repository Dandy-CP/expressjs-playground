import mongoose from "mongoose";

const users = () => {
  const SchemaUsers = new mongoose.Schema(
    {
      username: String,
      phoneNumber: String,
      email: String,
      password: String,
      name: String,
    },
    {
      timestamps: true,
    }
  );

  SchemaUsers.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

  return mongoose.model("users", SchemaUsers);
};

export default users;
