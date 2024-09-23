  const express = require("express");
  const router = express.Router();
  const User = require("../models/user.js");
  const catchAsync = require("../helpers/catchAsync.js");
  const passport = require('passport')


  const { storeReturnTo, alreadyLoggedIn, preventCaching,  isLoggedIn, getUserRole } = require("../middleware/middleware.js");
  const authController = require("../controllers/authController.js");


  // router.get("/login",preventCaching, storeReturnTo, authController.renderLogin);

  router.post("/login",  passport.authenticate('local'), authController.login);

  // router.get("/register",preventCaching, alreadyLoggedIn, authController.renderRegister);

  router.post(
    "/register",
    catchAsync(authController.register)
  );

  router.get("/logout",alreadyLoggedIn, preventCaching, authController.logout);
  router.get("/me", getUserRole);


  module.exports = router;