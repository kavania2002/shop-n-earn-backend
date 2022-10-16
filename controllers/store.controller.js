const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const Tier = require("../models/tier.model");
const Store = require("../models/store.model");
const userTier = require("../models/userTier.model");

const register = async (req, res) => {
  Store.findOne({ email: req.body.email }, async (err, foundStore) => {
    if (err) {
      res.status(400).send({
        message: err,
      });
    } else {
      if (!foundStore) {
        const {
          name,
          email,
          password,
          upi,
          city,
          longitude,
          latitude,
          mobile,
          image,
          categories,
        } = req.body;

        bcrypt.hash(password, 10, async (bcryptError, hashedPassword) => {
          if (bcryptError) {
            return res.status(401).send({ message: bcryptError });
          } else {
            const newStore = Store({
              name: name,
              longitude: longitude,
              latitude: latitude,
              city: city,
              email: email,
              mobile: mobile,
              password: hashedPassword,
              upi: upi,
              image: image,
              categories: categories,
            });

            await newStore.save();

            const token = jwt.sign({ data: newStore }, process.env.JWT_SECRET);

            res.send({ token: token, isTierSetup: false });
          }
        });
      } else {
        return res.status(401).send({ message: "Already exists" });
      }
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const foundStore = await Store.findOne({ email: email });
  if (foundStore) {
    bcrypt.compare(
      password,
      foundStore.password,
      async (bcryptError, result) => {
        if (bcryptError) {
          return res.status(401).send({ message: bcryptError });
        } else {
          if (result) {
            const token = jwt.sign(
              { data: foundStore },
              process.env.JWT_SECRET
            );

            const shopTiers = await Tier.find({ storeId: foundStore._id });

            if (shopTiers.length == 0) {
              return res.send({ token: token, isTierSetup: false, user: foundStore });
            } else {
              res.send({ token: token, isTierSetup: true, user: foundStore });
            }
          } else {
            return res
              .status(401)
              .send({ message: "Error occurred in Signing in" });
          }
        }
      }
    );
  } else {
    return res.status(401).send({ message: "Unknown username" });
  }
};

const get = async (req, res) => {
  const listOfStores = await Store.find();
  res.send({ stores: listOfStores });
};

const getStoreForUser = async (req, res) => {
  const { user } = req.body;

  const resultJson = { data: [] };

  const currentUserTier = await userTier
    .find({ user: user })
    .populate("storeId");

  currentUserTier.forEach((tier) => {
    const dataItem = {
      storeName: tier.storeId.name,
      storeImage: tier.storeId.image,
      tier: tier.tier,
    };
    resultJson.data.push(dataItem);
  });

  if (resultJson.data.length == 0) {
    const listOfStores = await Store.find();

    listOfStores.forEach((store) => {
      const dataItem = {
        storeName: store.name,
        storeImage: store.image,
        tier: 0,
      };
      resultJson.data.push(dataItem);
    });
  }
  res.send(resultJson);
};

const getStoreDetails = async (req, res) => {
  // all detail about store
  // current user tier
  // next user tier
  // percentage to next tier
  
  const { store, user } = req.body;

  const foundStore = await Store.findOne({ _id: store }).populate("tierIds");
  const foundUser = await User.findOne({ _id: user });
  const foundUserTier = await userTier.findOne({ user: user, storeId: store });
  const foundTier = await Tier.findOne({ shopId: store, level: foundUserTier.tier });

  const resultJson = {
    storeData: foundStore,
    currentTier: foundUserTier.tier,
    nextTier: foundUserTier.tier + 1,
    percentage: (foundUserTier.totalAmount - foundTier.minValue) / (foundTier.maxValue - foundTier.minValue) * 100,
  };

  res.send(resultJson);
};

module.exports = { login, register, get, getStoreForUser, getStoreDetails };
