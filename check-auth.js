const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET

module.exports = (req, res, next) => {
    try { const token = req.headers.authorization.split(" ")[1];
   const decodedToken = jwt.verify(
     token,
     secret
  ); req.userData = {
           userId: "admin"
     };    next();
    } catch (error) {
      res.status(401).json({ message: "Auth failed!" });
    }
  };