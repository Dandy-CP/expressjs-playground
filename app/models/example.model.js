import mongoose from "mongoose";

const example = () => {
  const schemaExample = new mongoose.Schema(
    {
      nama_lengkap: String,
      tanggal_lahir: Date,
      tempat_lahir: String,
      alamat: String,
    },
    {
      timestamps: true,
    }
  );

  schemaExample.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

  return mongoose.model("example", schemaExample);
};

export default example;
