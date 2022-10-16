const UserCoin = require("../models/userCoin.model");

const create = async (req, res) => {
  const { user, storeId } = req.body;

  const newUserCoin = UserCoin({
    userId: user.data._id,
    storeId: storeId,
    coins: 0,
  });

  await newUserCoin.save();

  res.send(newUserCoin);
};

// get user coin for a user and store
const getCoins = async (req, res) => {
  const { user, storeId } = req.body;

  const foundUserCoin = await UserCoin.findOne(
    { userId: user.data._id, storeId: storeId },
    async (err, foundUserCoin) => {
      if (err) {
        res.status(400).send({
          message: err,
        });
      } else {
        if (foundUserCoin) {
          res.send(foundUserCoin.coins);
        } else {
          return res.status(401).send({ message: "UserCoin not found" });
        }
      }
    }
  );
};

const updateCoins = async (req, res) => {
  const { user, storeId, difference } = req.body;

  const foundUserCoin = await UserCoin.findOne(
    { userId: user.data._id, storeId: storeId },
    async (err, foundUserCoin) => {
      if (err) {
        res.status(400).send({
          message: err,
        });
      } else {
        if (foundUserCoin) {
          if (foundUserCoin.coins + difference >= 0) {
            foundUserCoin.coins += difference;
            await foundUserCoin.save();
            res.send(foundUserCoin);
          } else {
            return res.status(401).send({ message: "Not enough coins" });
          }
        } else {
          return res.status(401).send({ message: "UserCoin not found" });
        }
      }
    }
  );
};

module.exports = { create, getCoins, updateCoins }