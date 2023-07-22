import bcrypt from "bcrypt";
import db from "../models/index.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const users = db.users;

const login = (req, res) => {
  users
    .find({
      username: `${req.body.username}`,
    })
    .then((data) => {
      if (req.body.password === "") {
        res.status(500).json({
          message: "Password Tidak Boleh Kosong",
        });
      } else if (req.body.password.length < 8) {
        res.status(500).json({
          message: "Password Harus 8 Karakter",
        });
      } else if (req.body.username.length === 0) {
        res.status(500).json({
          message: "Username tidak boleh kosong",
        });
      } else {
        if (data.length === 0) {
          res.status(404).json({
            message: "User Tidak Ditemukan",
            status: 404,
            error: true,
          });
        } else {
          const token = jwt.sign(
            { username: req.body.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          bcrypt.compare(req.body.password, data[0].password).then((result) => {
            if (result) {
              res.status(200).json({
                message: "Success",
                status: 200,
                error: false,
                data,
                token: token,
              });
            } else {
              res.status(500).json({
                message: "Password Salah",
                error: true,
              });
            }
          });
        }
      }
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

const signup = (req, res) => {
  if (req.body.username.length === 0) {
    res.status(500).json({
      message: "Username tidak boleh kosong",
    });
  } else if (req.body.password.length < 8) {
    res.status(500).json({
      message: "Password Harus 8 Karakter",
    });
  } else if (req.body.password.length === "") {
    res.status(500).json({
      message: "Password Tidak Boleh Kosong",
    });
  } else if (req.body.phoneNumber.length === 0) {
    res.status(500).json({
      message: "Phone number tidak boleh kosong",
    });
  } else if (req.body.email.length === 0) {
    res.status(500).json({
      message: "Email tidak boleh kosong",
    });
  } else if (req.body.name.length === 0) {
    res.status(500).json({
      message: "Nama  tidak boleh kosong",
    });
  } else {
    users
      .create({
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        name: req.body.name,
      })
      .then(() => {
        const token = jwt.sign(
          { username: req.body.username },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.send({ message: "Berhasil Daftar", error: false, token: token });
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  }
};

export default { login, signup };
