const Reviews = require('./../Model/modelReviews')
const AppError = require('./../class/AppError')
const Restaurants = require('./../Model/modelRestaurant')

exports.GetReviews = async (req, res, next) => {}

exports.CreateReviews = async (req, res, next) => {
  try {
    const newRev = await Reviews.create({
      userId: req.user._id,
      description: req.body.description,
    })

    await Restaurants.findOneAndUpdate(
      { _id: req.params.idRestaurant },
      { $push: { reviews: newRev._id } }
    )

    res.status(201).json(newRev)
  } catch (err) {
    next(new AppError(err, 401))
  }
}
exports.UpdateReview = async (req, res, next) => {}
exports.DeleteReview = async (req, res, next) => {}
