const mongoose = require('mongoose')

const schemaRestau = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name restaurant'],
  },
  image: [],
  description: {
    type: String,
    required: [true, 'Please provide name restaurant'],
  },
  praice: {
    type: String,
    required: [true, 'Please provide praice'],
  },
  timeShipping: {
    type: String,
  },
  address: {
    type: String,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
  },
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Orders',
    },
  ],
  items: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Items',
    },
  ],
  specialty: [],
})

const Restaurant = mongoose.model('Restaurant', schemaRestau)

module.exports = Restaurant
