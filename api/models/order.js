const mongoose = require('mongoose')

const order = new mongoose.Schema({
    name: String,
    price: Number,
    orders: {},
    method: String,
    active: Boolean,
    phone: String,
})


const Order = mongoose.model('order', order)

module.exports = Order