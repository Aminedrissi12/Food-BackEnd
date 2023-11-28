const mongoose = require('mongoose')

const shcemaReviews = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'plaese provide this description'],
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
})

const Reviews = mongoose.model('Reviews', shcemaReviews)

module.exports = Reviews
