const experss = require('express')
const Order = require('../models/order')
const User = require('../models/user')
const OrderRoute = experss.Router()

OrderRoute.get('/', async (req, res) => {
    try {
        const result = await Order.find()
        res.status(200).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

OrderRoute.post('/point/:id', async (req, res) => {
    const { id } = req.params
    const { phone } = req.body
    try {
        const result = await Order.findById(id)
        let user = await User.findOne({ phone: phone })
        user.points -= result.price
        await User.findByIdAndUpdate(user._id, user)
        await Order.findByIdAndDelete(id)
        res.send({ is: true, data: result })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

OrderRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Order.findById(id)
        res.status(200).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "not found" })
    }
})

OrderRoute.post('/', async (req, res) => {
    let { body } = req
    body.active = true
    try {
        const result = await Order.create(body)
        res.status(201).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

OrderRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        const result = await Order.findByIdAndUpdate(id, body)
        res.status(201).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

OrderRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Order.findByIdAndDelete(id)
        res.status(201).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})




module.exports = OrderRoute