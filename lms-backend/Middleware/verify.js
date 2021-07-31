import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

//verify the jwt token is valid or not
const verify = function (req, res, next) {
  //Get token from header
  let token = req.header("x-access-token") || req.header("Authorization");

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, auth denied" });
  }

  let checkBearer = "Bearer ";
  if (token.startsWith(checkBearer)) {
    token = token.slice(checkBearer.length, token.length);
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default verify;