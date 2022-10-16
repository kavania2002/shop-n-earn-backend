const { default: mongoose } = require("mongoose");
const Tier = require("../models/tier.model");
const Store = require("../models/store.model");

const create = async (req, res) => {
  const {
    name,
    description,
    level,
    minValue,
    maxValue,
    amountToCoinRatio,
    coinToAmountRatio,
  } = req.body;

  const newTier = new Tier({
    shopId: req.user.data._id,
    name: name,
    description: description,
    level: level,
    minValue: minValue,
    maxValue: maxValue,
    amountToCoinRatio: amountToCoinRatio,
    coinToAmountRatio: coinToAmountRatio,
  });

  const addedTier = await newTier.save();
  console.log(addedTier);
  Store.findById(req.user.data._id, async (storeFindError, foundStore) => {
    console.log(foundStore);
    foundStore["tierIds"].push(addedTier._id);
    await foundStore.save();
    res.send("Tier Added");
  });
};

const edit = async (req, res) => {
  const {
    tierId,
    name,
    description,
    level,
    minValue,
    maxValue,
    amountToCoinRatio,
    coinToAmountRatio,
  } = req.body;
  Tier.findByIdAndUpdate(
    tierId,
    {
      name: name,
      description: description,
      level: level,
      minValue: minValue,
      maxValue: maxValue,
      amountToCoinRatio: amountToCoinRatio,
      coinToAmountRatio: coinToAmountRatio,
    },
    (err, updatedTier) => {
      if (err) {
        res.status(401).send({ message: err });
      } else {
        res.send("Tier Edited");
      }
    }
  );
};

module.exports = { create, edit };
