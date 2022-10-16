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

const isStore = (req, res, next) => {
  const isStoreValue = req.user.data.isStore;
  if (isStoreValue != null && isStoreValue != undefined) {
    next();
  } else {
    return res.status(401).send({ message: "Permission Denied" });
  }
};

const isUser = (req, res, next) => {
  const isStoreValue = req.user.isStore;
  if (!isStore) {
    next();
  } else {
    return res.status(401).send({ message: "Permission Denied" });
  }
};

module.exports = { authMiddleware, isStore, isUser };
