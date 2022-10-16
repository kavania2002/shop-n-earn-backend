const jwt = require('jsonwebtoken');
const Store = require('../models/store.model');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    Store.findOne({ email: req.body.email }, async (err, foundStore) => {
        if (err) {
            res.status(400).send({
                message: err,
            });
        } else {
            if (!foundStore) {
                const { name, email, password, upi, city, longitude, latitude, mobile, image, categories } = req.body;

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
                            categories: categories
                        });

                        await newStore.save();

                        const token = jwt.sign({ data: newStore }, process.env.JWT_SECRET);

                        res.send({token: token, user: newStore});
                    }
                });
            } else {
                return res.status(401).send({ message: "Already exists" });
            }
        }
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const foundStore = await Store.findOne({ email: email });
    if (foundStore) {
        bcrypt.compare(password, foundStore.password, (bcryptError, result) => {
            if (bcryptError) {
                return res.status(401).send({ message: bcryptError });
            } else {
                if (result) {
                    const token = jwt.sign({ data: foundStore }, process.env.JWT_SECRET);

                    res.send({token: token, user: foundStore});
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
}

const get = async (req, res) => {
    const listOfStores = await Store.find();
    res.send({stores: listOfStores});
}

module.exports = { login, register, get };