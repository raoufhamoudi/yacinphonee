const Update = require("../models/Update");
const Users = require("../models/user");
const experss = require('express')
const UpdateRoute = experss.Router()



UpdateRoute.get('/', async (req, res) => {
    try {
        const result = await Update.find();
        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
})

UpdateRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Update.find({ invPhone: id });
        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
})

UpdateRoute.get('/find/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Update.findOne({ invtedPhone: id });
        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
})

UpdateRoute.get('/admin/:id', async (req, res) => {
    const { id } = req.params
    try {
        let result = await Update.findById(id);
        let newchange = await Users.findOne({ phone: result.invPhone })
        if (newchange) {
            newchange.points += 30
            let updated = await Users.findByIdAndUpdate(newchange._id, newchange)
            await Update.findByIdAndUpdate(id, { is: true })
            res.send(updated);
            return
        }
        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
})


module.exports = UpdateRoute