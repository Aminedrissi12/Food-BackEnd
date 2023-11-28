const Items = require('./../Model/modelItems')
const Restaurant = require('./../Model/modelRestaurant')
const AppError = require('./../class/AppError')

///////////////////////////////////////////////////
exports.GetItems = async (req, res, next) => {
  try {
    const items = await Items.find()
    res.status(200).json({
      status: '(ok), success',
      results: items.length,
      body: {
        items,
      },
    })
  } catch (err) {
    next(new AppError(err, 404))
  }
}
////////////////////////////////////////////////
exports.GetItemID = async (req, res, next) => {
  try {
    const itemID = await Items.findById(req.params.id)
    res.status(200).json({
      status: '(ok), success',
      data: {
        itemID,
      },
    })
  } catch (err) {
    next(new AppError(err, 404))
  }
}
////////////////////////////////////////
exports.createItem = async (req, res, next) => {
  try {
    // check if user our restaurant
    if (req.user.difficulty.type === 'user') {
      return next(new AppError('please sign as restaurant', 401))
    }

    const newItem = await Items.create(req.body)

    await Restaurant.findOneAndUpdate(
      { _id: req.user.restaurant[0] },
      { $push: { items: newItem._id } }
    )

    res.status(201).json({
      status: '(ok), successful',
      newItem,
    })
  } catch (err) {
    next(new AppError(err, 401))
  }
}
/////////////////////////////////////////////////
exports.UpdateItem = async (req, res, next) => {
  try {
    const UPdateItem = await Items.findByIdAndUpdate(req.params.id, req.body)

    res.status(201).json({
      status: '(ok),this item has been updated',
      data: {
        UPdateItem,
      },
    })
  } catch (err) {
    next(new AppError(err, 401))
  }
}
/////////////////////////////////////////////////
exports.DeleteItem = async (req, res, next) => {
  try {
    await Restaurant.updateOne(
      { _id: req.user.restaurant[0] },
      { $pullAll: { items: [req.params.id] } }
    )

    await Items.findByIdAndRemove(req.params.id)

    res.status(201).json({
      status: '(ok),this item has been deleted' + req.params.id,
    })
  } catch (err) {
    next(new AppError(err, 401))
  }
}
