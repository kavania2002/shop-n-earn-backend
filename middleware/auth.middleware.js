const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const headerToken = req.headers.authorization;

  if (!headerToken) {
    return res.status(401).send({ message: "No token provided" });
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return res.status(401).send({ message: "Invalid Token" });
  }

  const token = headerToken.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).send({ message: "Invalid Token" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
      req.user = user;
      next();
    } else {
      return null;
    }
  } catch (error) {
    return res.status(401).send({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
