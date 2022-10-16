const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  User.findOne({ email: req.body.email }, async (err, foundUser) => {
    if (err) {
      res.status(400).send({
        message: err,
      });
    } else {
      if (!foundUser) {
        const { name, longitude, latitude, address, email, mobile, password } =
          req.body;

        bcrypt.hash(password, 10, async (bcryptError, hashedPassword) => {
          if (bcryptError) {
            return res.status(401).send({ message: bcryptError });
          } else {
            // TODO add upi's
            const newUser = User({
              name: name,
              longitude: longitude,
              latitude: latitude,
              address: address,
              email: email,
              mobile: mobile,
              password: hashedPassword,
            });

            await newUser.save();

            const token = jwt.sign({ data: newUser }, process.env.JWT_SECRET);

            res.send({token: token});
          }
        });
      } else {
        return res.status(401).send({ message: "Already Exists" });
      }
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  if (foundUser) {
    bcrypt.compare(password, foundUser.password, (bcryptError, result) => {
      if (bcryptError) {
        return res.status(401).send({ message: bcryptError });
      } else {
        if (result) {
          const token = jwt.sign({ data: foundUser }, process.env.JWT_SECRET);

          res.send({token: token});
        } else {
          return res
            .status(401)
            .send({ message: "Error occurred in Signing in" });
        }
      }
    });
  } else {
    return res.status(401).send({ message: "Unknown username" });
  }
};

module.exports = { register, login };
