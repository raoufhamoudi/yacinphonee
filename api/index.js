const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const UserRoute = require('./routs/userRoute');
const ItemRoute = require('./routs/itemRoute');
const OrderRoute = require('./routs/orderRoute');
const UpdateRoute = require('./routs/UpdateRoute');
const AuthRoute = require('./routs/AuthRoute');
const ActionRoute = require('./routs/actionRoute');
const app = express()

app.use(cors());
app.use(express.json())

app.use('/find', AuthRoute)
app.use('/items', ItemRoute)
app.use('/order', OrderRoute)
app.use('/update', UpdateRoute)
app.use('/actions', ActionRoute)
app.use('/', UserRoute)







app.listen("5000")



mongoose
    .connect('mongodb+srv://raoufhamoudi:raouf@cluster0.3xjn9ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("mriglla")

    })
    .catch(err => console.log(err))