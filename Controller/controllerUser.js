const Users = require('./../Model/modelUSers')
const jwt = require('jsonwebtoken')
const AppError = require('./../class/AppError')
const bcryptjs = require('bcryptjs')

// //////////////////////////////////////////////////////////////

const Newtoken = function (_id) {
  return jwt.sign({ id: _id }, `${process.env.KEY}`, {
    algorithm: 'HS256',
    expiresIn: process.env.DateTkoneExp,
  })
}
// //////////////////////////////////////////////////////////////
exports.signUp = async (req, res, next) => {
  try {
    const NewUser = await Users.create({
      FullName: req.body.FullName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    })

    const token = Newtoken(NewUser._id)

    res.status(200).json({
      status: 'successful',
      token,
      user: {
        id: NewUser._id,
        FullName: NewUser.FullName,
        email: NewUser.email,
        difficulty: NewUser.difficulty,
        restaurant: NewUser.restaurant,
        cart: NewUser.cart,
        orders: NewUser.orders,
        cared: NewUser.cared,
        photo: NewUser.photo,
        phone: NewUser.phone,
        address: NewUser.address,
      },
    })
  } catch (error) {
    console.log(error)
    next(new AppError(error, 401))
  }
}

// /////////////////////////////////////////////////////////////

exports.login = async (req, res, next) => {
  let email = req.body.email
  let password = req.body.password
  const user = await Users.findOne({ email })

  // -------check if email and password ---------------------

  if (!email || !password) {
    return next(new AppError('email or password invalid', 401))
  } else if (!user) {
    return next(new AppError('email or password invalid', 401))
  }

  // --------------validat the password---------------

  const valitdatPass = await bcryptjs.compare(password, user.password)

  if (!valitdatPass) {
    return next(new AppError('email or password invalid', 401))
  }

  const token = Newtoken(user._id)
  // -------------------send the client data--------------------
  // , { httpOnly: tr
  res.status(200).json({
    token,
    user: {
      id: user._id,
      FullName: user.FullName,
      email: user.email,
      difficulty: user.difficulty,
      restaurant: user.restaurant,
      cart: user.cart,
      cart: user.cart,
      orders: user.orders,
      cared: user.cared,
      photo: user.photo,
      phone: user.phone,
      address: user.address,
    },
  })
}
// /////////////////////////////////////////////////////////////

exports.autoAuth = (req, res) => {
  // console.log('autoAuth', req.UserID)
  const user = req.user
  let token = req.token

  res.status(200).json({
    token,
    user: {
      id: user._id,
      FullName: user.FullName,
      email: user.email,
      difficulty: user.difficulty,
      restaurant: user.restaurant,
      cart: user.cart,
      orders: user.orders,
      cared: user.cared,
      photo: user.photo,
      phone: user.phone,
      address: user.address,
    },
  })
}

// ///////Check if Auth //////////////////////////////////////
exports.CheckAuth = async (req, _, next) => {
  let tokenClient = req.headers._tk
  let decoded
  // verify  token is in headers

  if (tokenClient === 'undefined') {
    return next(new AppError('Please log in to get access', 401))
  } else {
    //  verify token
    try {
      decoded = await jwt.verify(tokenClient, process.env.KEY)
    } catch (err) {
      return next(new AppError('Please log in to get access catch', 401))
    }

    const user = await Users.findById(decoded.id)

    // verify user
    if (!user) {
      return next(new AppError('Please log in to get access', 401))
    } else {
      req.user = user
      req.UserID = user._id
      req.token = req.headers._tk
      next()
    }
  }
}
// //////////////////////////////////////////////////////////////////

exports.UpdateAuth = async (req, res, next) => {
  console.log(req.body)
  console.log('jgkfjg')

  try {
    let token = req.token
    const resUser = await Users.findByIdAndUpdate(
      { _id: req.UserID },
      req.body,
      { new: true }
    )
    //
    console.log(resUser)
    res.status(201).json({
      status: 'OK',
      token,
      user: {
        id: resUser._id,
        FullName: resUser.FullName,
        email: resUser.email,
        difficulty: resUser.difficulty,
        restaurant: resUser.restaurant,
        cart: resUser.cart,
        orders: resUser.orders,
        cared: resUser.cared,
        photo: resUser.photo,
        phone: resUser.phone,
        address: resUser.address,
      },
    })
  } catch (err) {
    return next(new AppError('user not found', 401))
  }
}
