const mongoose = require('mongoose')
const {Schema, model} = require('mongoose')
var Float = require('mongoose-float').loadType(mongoose);

const reviewSchema = new Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, default: 0 },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const productSchema = new Schema({
    name: {type: String, required: true},
    brand: {type: String},
    sizes: [],
    color: {type: String, required: true},
    imageUrl: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    price: {type: Float, default: 0, required: true},
    rating: {type: Float, default: 0, required: true},
    numReviews: {type: Number, default: 0, required: true},
    countInStock: {type: Number, default: 0, required: true},
    description: {type: String},
    reviews: [reviewSchema],
    isActive: {type: Boolean, default: true}
})

const productModel = model("Product", productSchema)

module.exports = productModel
