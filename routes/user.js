const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get((req, res) => {
    res.render("./users/signup.ejs");
  })
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get((req, res, next) => {
    res.render("./users/login.ejs");
  })
  .post(saveRedirectUrl, wrapAsync(userController.loginForm));

router.get("/logout", userController.logout);

module.exports = router;
