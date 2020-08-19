const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config')
const dotenv = require('dotenv')
const path = require('path')



dotenv.config()
mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(err => console.log(err))

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(bodyParser.json())

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/uploads', require('./routes/uploadRoutes'))
app.use('/uploads', express.static(path.join(__dirname, '/../frontend/public/uploads')));
app.get('/api/config/paypal', (req,res) => {
    res.send(config.PAYPAL_CLIENT_ID)
})
app.listen(5000, () => {
    console.log('App was started at port 5000')
})


