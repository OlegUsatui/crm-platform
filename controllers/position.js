const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        });
        res.status(200).json(positions)
    } catch (err) {
        errorHandler(err, res)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Position.deleteOne({
            _id: req.params.id
        })
        res.status(200).json({
            message: 'Позиция была удалена'
        })
    } catch (err) {
        errorHandler(err, res)
    }
}

module.exports.create = async function (req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            category: req.body.category,
            cost: req.body.cost,
            user: req.user.id
        }).save()
        res.status(201).json(position);
    } catch (err) {
        errorHandler(err, res)
    }
}

module.exports.update = async function (req, res) {
    try {
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(position)
    } catch (err) {
        errorHandler(err, res)
    }
}
