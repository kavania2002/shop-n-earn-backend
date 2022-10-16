const coinLog = require("../models/coinLog.model");
const User = require("../models/user.model");
const Store = require("../models/store.model");

// create a coin log by passing id of user and store
const create = async (req, res) => {
  const { store, user, amount, coinsUsed } = req.body;

  const newCoinLog = coinLog({
    store: store,
    user: user.data._id,
    amount: amount,
    coinsUsed: coinsUsed,
  });

  await newCoinLog.save();

  res.send(newCoinLog);
};

// get all coin logs for a user
const getAllForUser = async (req, res) => {
  const { user } = req.body;

  const foundUser = await User.findOne(
    { _id: user.data.id },
    async (err, foundUser) => {
      if (err) {
        res.status(400).send({
          message: err,
        });
      } else {
        if (foundUser) {
          const foundCoinLogs = await coinLog.find({ user: user });
          res.send(foundCoinLogs);
        } else {
          return res.status(401).send({ message: "User not found" });
        }
      }
    }
  );
};

// get all coin logs for a store
const getAllForStore = async (req, res) => {
  const { store } = req.body;

  const foundStore = await Store.findOne(
    { _id: store },
    async (err, foundStore) => {
      if (err) {
        res.status(400).send({
          message: err,
        });
      } else {
        if (foundStore) {
          const foundCoinLogs = await coinLog.find({ store: store });
          res.send(foundCoinLogs);
        } else {
          return res.status(401).send({ message: "Store not found" });
        }
      }
    }
  );
};
