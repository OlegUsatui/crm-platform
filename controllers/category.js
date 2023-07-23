const Category = require("../models/Category");
const errorHandler = require('../utils/errorHandler');
const Position = require("../models/Position");

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
        await Category.remove({
            _id: req.params.id
        })
        await Position.remove({
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
    try {
        const category = await new Category({
            name: req.body.name,
            imgSrc: req.body.imgSrc,
            user: req.user.id
        }).save()
        res.status(201).json(category);
    } catch (err) {
        errorHandler(err, res)
    }
}

module.exports.update = async function (req, res) {
    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(category)
    } catch (err) {
        errorHandler(err, res)
    }
}
