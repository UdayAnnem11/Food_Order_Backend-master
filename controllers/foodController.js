const AppError = require("./errorController");
const Food = require("../models/food");
const Restaurant = require("../models/restaurant");

const ITEM_PER_PAGE = 50;
/**
 * PUBLIC ACCESS
 */

exports.getAvailableFoods = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalFoods;
  Food.find()
    .countDocuments()
    .then((numbersOfFoods) => {
      totalFoods = numbersOfFoods;
      return Food.find()
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE);
    })
    .then((foods) => {
      return res.status(200).json(foods);
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
};

/**
 * Get Top 10 restaurants in specified Area
 */
exports.getTopRestaurants = (req, res, next) => {
  Restaurant.find()
    .populate("foods")
    .then((result) => {
      res.status(200).json("These are the top restaurants in the city");
    })
    .catch((err) => {
      return AppError.onError(res, "restaurant add error" + err);
    });
};

exports.getAllFoodsFromRestaurant = (req, res, next) => {
  const restaurantId = req.params.id;
  Restaurant.findById(restaurantId)
    .populate("foods")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
};

exports.getFoodDetails = (req, res, next) => {
  const foodId = req.params.id;
  Food.findById(foodId)
    .then((result) => {
      res.status(200).json("These are food details");
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
};

exports.getInThirtyMinutes = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalFoods;
  Food.find({ readyTime: { $lt: 31 } })
    .countDocuments()
    .then((numbersOfFoods) => {
      totalFoods = numbersOfFoods;
      return Food.find({ readyTime: { $lt: 31 } })
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE);
    })
    .then((foods) => {
      return res.status(200).json("Food will be sent in 30 Minutes 'YEAHAY' ");
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
};


exports.test = (req, res, next) => {
  res.status(200).json({
    message: "Food will be sent in 30 Minutes 'YEAHAY'",
  });
};

