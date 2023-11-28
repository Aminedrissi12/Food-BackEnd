const Restaurant = require('./../Model/modelRestaurant')
const Users = require('./../Model/modelUSers')
const AppError = require('./../class/AppError')

exports.GetRestau = async (req, res, next) => {
  try {
    const RST = await Restaurant.find()

    res.status(200).json({
      status: '(ok), success',
      results: RST.length,
      body: {
        RST,
      },
    })
  } catch (err) {
    next(new AppError(err, 404))
  }
}

exports.createRestaurant = async (req, res, next) => {
  try {
    // check user if restaurant or not!!
    if (req.user.difficulty.type === 'user') {
      return next(new AppError('please sign as restaurant', 401))
    }

    const newRestau = await Restaurant.create(req.body)
    // add restaurant id to this  userRest
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { restaurant: newRestau._id } }
    )
    // send newRestau to clinet
    res.status(201).json(newRestau)
  } catch (err) {
    next(new AppError(err, 401))
  }
}

exports.GetRestauID = async (req, res, next) => {
  try {
    const RestID = await Restaurant.findById(req.params.id)
    res.status(200).json(RestID)
  } catch (err) {
    next(new AppError(err, 404))
  }
}

exports.DeletRestaurant = async (req, res, next) => {}
exports.UpdateRestaurant = async (req, res, next) => {}
