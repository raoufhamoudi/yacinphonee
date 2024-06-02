const Users = require("../models/user");
const experss = require('express')
const AuthRoute = experss.Router()


AuthRoute.post('/', async (req, res) => {
    const { body } = req
    try {
        const user = await Users.findOne({ phone: body.phone });
        if (!user) {
            return res.send({ message: "لايوجد حساب بهاد الرقم", is: false });
        }
        res.send({ data: user, is: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
})

module.exports = AuthRoute