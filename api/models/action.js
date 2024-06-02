const mongoose = require('mongoose')

const action = new mongoose.Schema({
    phone: String,
    price: String,
    des: String,
    points: Number,
    active: Boolean
})


const Action = mongoose.model('action', action)

module.exports = Action