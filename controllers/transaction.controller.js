// create a new transaction
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const Store = require("../models/store.model");
const UserTier = require("../models/userTier.model");
const UserCoin = require("../models/userCoin.model");

const create = async (req, res) => {
  const { store, user, amount, status, upi } = req.body;

  const newTransaction = Transaction({
    store: store,
    user: user.data._id,
    amount: amount,
    status: status,
    upi: upi,
  });

  await newTransaction.save();

  res.send(newTransaction);
};

// get all transactions for a user
const getAllForUser = async (req, res) => {
  const { user } = req.body;

  const foundUser = await User.findOne(
    { _id: user.data },
    async (err, foundUser) => {
      if (err) {
        res.status(400).send({
          message: err,
        });
      } else {
        if (foundUser) {
          const foundTransactions = await Transaction.find({ user: user });
          res.send(foundTransactions);
        } else {
          return res.status(401).send({ message: "User not found" });
        }
      }
    }
  );
};

// get all transactions for a store
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
          const foundTransactions = await Transaction.find({ store: store });
          res.send(foundTransactions);
        } else {
          return res.status(401).send({ message: "Store not found" });
        }
      }
    }
  );
};