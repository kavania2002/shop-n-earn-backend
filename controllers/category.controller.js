const Category = require('../models/category.model');

const create = async (req, res) => {
    const { name } = req.body;

    const newCategory = new Category({
        name: name,
    });

    await newCategory.save();

    res.send("New Category Saved");
}

const get = async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
}

module.exports = { create, get }