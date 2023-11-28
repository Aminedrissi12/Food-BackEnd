const Express = require('express')
// const multer = require('multer')
const auth = require('../Controller/controllerUser')
const Restaurant = Express.Router()
const restau = require('../Controller/controllerRestaurant')

// add image to the restorant
// const storig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'Uploads/Restaurants')
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
//   },
// })

// const uplode = multer({
//   storage: storig,
// }).single('image')

// //////////////////////////////////////////////////////

Restaurant.route('/user-restaurant')
  .get(auth.CheckAuth, restau.GetRestau)
  .post(auth.CheckAuth, restau.createRestaurant)

Restaurant.route('/user-restaurant/:id')
  .get(auth.CheckAuth, restau.GetRestauID)
  .patch(auth.CheckAuth, restau.UpdateRestaurant)
  .delete(auth.CheckAuth, restau.DeletRestaurant)

module.exports = Restaurant
