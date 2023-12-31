const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imgSrc: {
        type: String,
    },
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('categories', categorySchema)
