const Category = require("../models/Category");
const errorHandler = require('../utils/errorHandler');
const Position = require("../models/Position");
const {update} = require("./position");

module.exports.getAll = async function (req, res) {
    try {
        const category = await Category.find({
            user: req.user.id
        });
        res.status(200).json(category)
    } catch (err) {
        errorHandler(err, res)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category)
    } catch (err) {
        errorHandler(err, res)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Category.deleteOne({
            _id: req.params.id
        })
        await Position.deleteOne({
            category: req.params.id
        })
        res.status(200).json({
            message: 'Категория была удалена'
        })
    } catch (err) {
        errorHandler(err, res)
    }
}

module.exports.create = async function (req, res) {
    const category = new Category({
        name: req.body.name,
        imgSrc: req.file ? req.file.path : '',
        user: req.user.id
    })
    try {
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        errorHandler(err, res)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        name: req.body.name
    }

    if(req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(category)
    } catch (err) {
        errorHandler(err, res)
    }
}
