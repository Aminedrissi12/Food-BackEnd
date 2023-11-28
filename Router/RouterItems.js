const Express = require('express')
const Items = Express.Router()
const ITE = require('./../Controller/controllerItems')
const protuct = require('./../Controller/controllerUser.js')

Items.route('/restau-item')
  .get(ITE.GetItems)
  .post(protuct.CheckAuth, ITE.createItem)
Items.route('/restau-item/:id')
  .get(protuct.CheckAuth, ITE.GetItemID)
  .patch(protuct.CheckAuth, ITE.UpdateItem)
  .delete(protuct.CheckAuth, ITE.DeleteItem)

module.exports = Items
