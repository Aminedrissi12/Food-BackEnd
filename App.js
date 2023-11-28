const Express = require('express')
const app = Express()
const cors = require('cors')
const RS = require('./Router/RouterRestaurants')
const NewUser = require('./Router/RouterUser')
const Items = require('./Router/RouterItems')
const Reviews = require('./Router/RouterReviews')
const controllerError = require('./Controller/controllerError')

//Middleware /////////////////////////////////////////////////////////////////////
app.use(Express.json())
app.use(cors())
// ///////Router////////
app.use('/api/restaurants', RS)
app.use('/api/new-user', NewUser)
app.use('/api/items', Items)
app.use('/api/reviews', Reviews)
// ///////uploads///////
app.use('/api/uploads', Express.static('uploads'))
// ///////Error/////////
app.use(controllerError)
// ////////////////////////////////////////////////////////////////////////////////

module.exports = app
