const express = require("express");
const router = express();
const User = require("../models/user.js");
const catchAsync = require("../helpers/catchAsync.js");
const ExpressError = require("../helpers/expressError.js");
const { isLoggedIn, isEducator, isStudent, preventCaching } = require("../middleware/middleware.js");
const userController = require('../controllers/userController.js');



router.get('/:educatorId', async (req, res) => {
  const { educatorId } = req.params;

  try {
    const educator = await User.findById(educatorId);

    if (!educator) {
      return res.status(404).json({ error: 'Educator not found' });
    }

    // Return educator details
    res.json(educator);
  } catch (error) {
    console.error('Errorrr fetching educator:', error);
    res.status(500).json({ error: 'Failed to fetch educator' });
  }
});


router.get(
    "/educator/:id",
    isLoggedIn,
    isEducator,
    preventCaching,
    catchAsync(userController.renderEducatorProfile)
  );
  
  router.get(
    "/educator/:id/edit",
    isLoggedIn,
    isEducator,
    preventCaching,
    catchAsync(userController.renderEditEducatorProfile)
  );
  
  // router.get("/", isLoggedIn, preventCaching, (req, res) => {
  //   res.send("You are logged in!");
  // });
  router.put(
    "/educator/:id/edit",
    isLoggedIn,
    isEducator,
    catchAsync(userController.updateEducatorProfile)
  );
  
  ///////////////////////////////////////////////////
  
  ///////////////////////////////////////////////////////////////////////
  router.get(
    "/student/:id",
    isStudent,
    isLoggedIn,
    preventCaching,
    catchAsync(userController.renderStudentProfile)
  );
  router.get(
    "/student/:id/edit",isStudent,
    isLoggedIn,
    preventCaching,
    catchAsync(userController.renderEditStudentProfile)
  );
  
  router.put(
    "/student/:id/edit",isStudent,
    catchAsync(userController.updateStudentProfile)
  );

  
module.exports = router;
