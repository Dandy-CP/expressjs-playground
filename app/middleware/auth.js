import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      message: "A token is required for authentication",
      error: true,
      code: 403,
    });
  } else {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ["HS256"],
      });
      req.users = decode;
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Invalid Token", error: true, code: 401 });
    }
  }

  return next();
};

export default verifyToken;
