const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const shcemaUsers = new mongoose.Schema({
  FullName: {
    type: String,
    unique: false,
    required: [true, 'Please provide your  Full Nam '],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'this email  is invalide try another one'],
    // unique: [true, 'this email has been registered'],
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide your confirm password'],
    minlength: 8,
    validate: {
      validator: function (el) {
        return el === this.password
      },
    },
  },
  difficulty: {
    type: {
      type: String,
      default: 'user',
      enun: ['user', 'restaurant'],
    },
  },
  restaurant: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Restaurant',
    },
  ],
  cart: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Items',
    },
  ],
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Orders',
    },
  ],
  cared: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Cared',
    },
  ],
  photo: {
    type: String,
    default:
      'https://firebasestorage.googleapis.com/v0/b/find-coachse.appspot.com/o/profileImage%2F1662140421724-image.jpg?alt=media&token=be3242cb-0fe7-41dd-a035-2c8b0f2cf9f8',
  },
  phone: {
    type: String,
    default: 'Number phone',
  },
  yearsBirth: {
    type: String,
  },
  address: {
    type: String,
  },
})

// ------------------------full Name ---------------------
shcemaUsers.path('FullName').validate(async (FullName) => {
  return true
}, '')
// -----------------validate unique email ----------------
shcemaUsers.path('email').validate(async (email) => {
  const uniqueEmail = await mongoose.models.Users.countDocuments({ email })
  return !uniqueEmail
}, 'invalid email try another one')
// ----------------------incrypt passworde ---------------
shcemaUsers.pre('save', async function (next) {
  const bcryptPassworde = await bcryptjs.hash(this.password, 12)
  this.password = bcryptPassworde
  this.passwordConfirm = undefined
  next()
})

const Users = mongoose.model('Users', shcemaUsers)

module.exports = Users
