const {Schema, model} = require('mongoose')

const shippingSchema = {
    name: {type: String, required: true},
    surname: {type: String, required: true},
    city: {type: String, required: true},
    newPost: {type: Number, required: true},
    phone: {type: String, required: true}
}

const paymentSchema = {
    paymentMethod: {type: String, required: true},
    paymentResult: {
        payerID: {type: String},
        orderID: {type: String},
        paymentID: {type: String}
    }
}

const orderItemSchema = new Schema({
    name: {type: String, required: true},
    qty: {type: String, required: true},
    imageUrl: {type: String, required: true},
    price: {type: String, required: true},
    size: {type: String, required: true},
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true}
})

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    itemsPrice: {type: Number},
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date}
}, {
    timestamps: true
})

const orderModel = model("Order", orderSchema)

module.exports = orderModel
