const mongoose = require('mongoose')

const item = new mongoose.Schema({
    price: String,
    name: String,
    pro: String,
    rom: String,
    camera: String,
    screen: String,
    os: String,
    battery: String,
    des: String,
    type: String,
    img: [],
    stutus: String
})


const Item = mongoose.model('item', item)

module.exports = Item