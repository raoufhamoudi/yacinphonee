const experss = require('express')
const Action = require('../models/action')
const Users = require("../models/user");
const ActionRoute = experss.Router()

ActionRoute.get('/', async (req, res) => {
    try {
        const result = await Action.find()
        res.status(200).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})

ActionRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Action.findById(id)
        res.status(200).send({ data: result, is: true })
    } catch (error) {
        res.status(400).send({ message: "not found" })
    }
})

ActionRoute.post('/', async (req, res) => {
    let { body } = req
    try {
        const result = await Action.create(body)
        let user = await Users.findOne({ phone: body.phone })
        if (user) {
            user.points += body.points
            user = await Users.findByIdAndUpdate(user._id, user)
            res.send({ is: true, data: user })
            return
        }
        // const result = await Users.create(body)
        res.status(404).send({ data: result, is: false, message: "somting went wrong" })
    } catch (error) {
        res.status(400).send({ message: "something went wrong" })
    }
})


ActionRoute.get('/my/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Action.find({ phone: id })

        if (result) {
            res.send({ is: true, data: result, length: result.length })
            return
        }
        res.status(404).send({ is: false, message: "somting went wrong" })
    } catch (error) {

    }
})



module.exports = ActionRoute