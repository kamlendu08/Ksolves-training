const jwt = require('jsonwebtoken');
require('dotenv').config();

function authToken(req, res, next) {
  // console.log("here we are")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log(token);
  if (!token) {
    res.status(401).json({ res: "bad token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.email = decoded;
    next();
  } catch (e) {
    res.status(401).json({ res: "not authenticated" })
  }
  // res.json({ decod: decoded });

}

module.exports = authToken;
