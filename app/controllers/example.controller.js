import db from "../models/index.js";

const example = db.example;

const get = (req, res) => {
  example
    .find()
    .then((data) => {
      res.status(200).json({
        message: "Success",
        status: 200,
        error: false,
        dataExample: data,
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

const getQuery = (req, res) => {
  const id = req.params.id;

  example
    .findById(id)
    .then((data) => {
      res.status(200).json({
        message: "Success",
        status: 200,
        error: false,
        dataExample: data,
      });
    })
    .catch((error) => {
      res.status(404).send({
        message: "Data Tidak Ditemukan",
        status: 404,
        error: false,
        node: error.message,
      });
    });
};

const post = (req, res) => {
  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir);

  example
    .create(req.body)
    .then(() => {
      res.send({ message: "Data Berhasil Di Simpan", error: false });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

const put = (req, res) => {
  const id = req.params.id;
  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir);

  example
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Data yang di update tidak ditemukan" });
      } else {
        res
          .status(201)
          .json({ message: "Data Berhasil di Update", error: false });
      }
    })
    .catch((error) => {
      res.status(404).send({
        message: "Data yang di update tidak ditemukan",
        node: error.message,
      });
    });
};

const deleteData = (req, res) => {
  const id = req.params.id;

  example
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Data tidak ditemukan" });
      }

      res
        .status(201)
        .json({ message: "Data Berhasil di Delete", error: false });
    })
    .catch((error) => {
      res.status(404).send({
        message: "Data yang di update tidak ditemukan",
        node: error.message,
      });
    });
};

export default { get, post, put, getQuery, deleteData };
