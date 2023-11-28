const Express = require('express')
const Reviews = Express.Router()
const protect = require('./../Controller/controllerUser')
const review = require('./../Controller/controllerReviews')

Reviews.route('/:idRestaurant/user-reviews')
  .get(protect.CheckAuth, review.GetReviews)
  .post(protect.CheckAuth, review.CreateReviews)

Reviews.route('/user-review/:id')
  .patch(protect.CheckAuth, review.UpdateReview)
  .delete(protect.CheckAuth, review.DeleteReview)

module.exports = Reviews
