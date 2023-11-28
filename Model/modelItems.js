const mongoose = require('mongoose')

const schemaItem = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'plaese provide name of item'],
  },
  image: [],
  description: {
    type: String,
    required: [true, 'plaese provide this description'],
  },
  praice: {
    type: Number,
    required: [true, 'plaese provide this praice'],
  },
  ingredients: {
    type: String,
    required: [true, 'plaese provide this ingredients'],
  },
  nutritionalValue: {
    type: String,
    required: [true, 'plaese provide this nutritional Value'],
  },
})

const Items = mongoose.model('Items', schemaItem)

module.exports = Items
