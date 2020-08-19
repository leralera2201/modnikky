const {Schema, model} = require('mongoose')

const categorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String},
    isActive: {type: Boolean, default: true}
})

module.exports = model('Category', categorySchema)
