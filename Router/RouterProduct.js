const Express = require('express')
const Products = Express.Router()
const product = require('../Controller/controllerItems')
const auth = require('../Controller/controllerUser')

/////////////////Middleware router Product ///////////
Products.route('/items').get(auth.CheckAuth, product.GetProduct)

Products.route('/item').post(auth.CheckAuth, product.PostProduct)

Products.route('/item/:id')
  .get(auth.CheckAuth, product.GetProductID)
  .patch(auth.CheckAuth, product.UpdateProduct)
  .delete(auth.CheckAuth, product.DeleteProduct)

/////////////////////////////////////////////////////
module.exports = Products
