const { default: mongoose } = require('mongoose');
const Tier = require('../models/tier.model');

const create = (req, res) => {
    const { name, description, level, minValue, maxValue, amountToCoinRatio, cointToAmountRatio } = req.body;

    const newTier = new Tier({
        name: name,
        description: description,
        level: level,
        minValue: minValue,
        maxValue: maxValue,
        amountToCoinRatio: amountToCoinRatio,
        coinToAmountRatio: coinToAmountRatio
    })

    newTier.save();

    res.status(200);
}

const edit = (req, res) => {
    const { name, description, tierIds, level, minValue, maxValue, amountToCoinRatio, cointToAmountRatio } = req.body;

    
}