// create a new transaction
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const Store = require("../models/store.model");
const UserTier = require("../models/userTier.model");
const UserCoin = require("../models/userCoin.model");
const Tier = require("../models/tier.model");

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

  const currentUserTier = await UserTier.findOne({
    userId: user.data._id,
    storeId: store,
  });

  const currentTier = await Tier.findOne({
    shopId: store,
    level: currentUserTier.tier,
  });

  currentUserTier.totalAmount += amount;
  if (currentUserTier.totalAmount >= currentTier.maxAmount) {
    currentUserTier.tier += 1;
  }

  await currentUserTier.save();

  const currentUserCoin = await UserCoin.findOne({
    userId: user.data._id,
    storeId: store,
  });

  const finalTier = await Tier.findOne({
    shopId: store,
    level: currentUserTier.tier,
  });

  currentUserCoin.coins += Math.floor(amount * finalTier.amountToCoinRatio);

  await currentUserCoin.save();

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
          const foundTransactions = await Transaction.find({ store: store }).
                                      populate("userId");

          resultJson = { data: [] };
            
          foundTransactions.forEach((transaction) => {
            const dataItem = {
              name: transaction.userId.name,
              upiId: transaction.userId.upi,
              amount: transaction.amount,
              dateTime: transaction.created_at,
            };
            resultJson.data.push(dataItem);
          });


          res.send(resultJson);
        } else {
          return res.status(401).send({ message: "Store not found" });
        }
      }
    }
  );
};

module.exports = { create, getAllForUser, getAllForStore };
