const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const auth = require("../middlewares/userAuth");

// SIGNUP
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid email ID")
      .custom((value, req) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already Exist");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Your password whould have to atlest 6 Character long"),
  ],
  userController.onSignup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid email ID")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Please Enter a Valid Password!"),
  ],
  userController.onLogin
);

router.put("/cart/:id/:qty", userController.editCart);

router.post("/cart/:id", userController.addToCart);

router.get("/cart",  userController.getCart);

router.get("/order", userController.getOrder);

router.get("/order/:id", userController.getSelectedOrder);

router.post("/add-order",  userController.addOrder);

router.get("/profile", userController.viewProfile);

router.post("/address", userController.editAddress);

module.exports = router;
