const express = require("express");
const User = require("../models/user.js");
const Resource = require("../models/resource.js");
const catchAsync = require("../helpers/catchAsync.js");
const multer = require("multer");
const path = require('path')
const router = express.Router();
const { isLoggedIn, isEducator, isStudent, storeReturnTo, preventCaching,  } = require("../middleware/middleware.js");
const resourceController = require('../controllers/resourceController.js')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


router.get(
  "/manage/:userId",
  isLoggedIn,
  isEducator,
  catchAsync(resourceController.index)
);

router.get(
  "/manage/:userId",
  isLoggedIn,
  isEducator,
  catchAsync(resourceController.getUserDetails)
);

router.get(
  "/manage/:userId/show/:resourceId",
  isEducator,
  isLoggedIn,
  catchAsync(resourceController.showResource)
);

router.get(
  "/manage/:userId/edit/:resourceId",
  isEducator,
  catchAsync(resourceController.renderEdit)
);

router.put(
  "/manage/:userId/edit/:resourceId",
  isEducator,
  upload.single("file"),
  catchAsync(resourceController.updateResource)
);

router.get(
  "/manage/:userId/new",
  isEducator,
  catchAsync(resourceController.renderNewResource)
);

router.post(
  "/manage/:userId/new",
  isLoggedIn,
  isEducator,
  upload.single("file"),
  catchAsync(resourceController.postNewResource)
);

  router.get(
    "/view/:userId",
    isStudent,
    catchAsync(resourceController.studentIndex)
  );

router.get(
  "/view/:userId/show/:resourceId",
  isLoggedIn,
  isStudent,
  preventCaching,
  catchAsync(resourceController.studentShowResource)
);

router.delete(
  '/manage/:userId/delete/:resourceId',
  isLoggedIn,
  isEducator,
  catchAsync(resourceController.deleteResource)
);
router.post('/manage/:userId/undo/:resourceId', async (req, res) => {
  const { userId, resourceId } = req.params;

  try {
    // Implement logic to find and restore the deleted resource
    const restoredResource = await Resource.findByIdAndUpdate(resourceId, { deleted: false }, { new: true });

    if (!restoredResource) {
      return res.status(404).json({ error: 'Resource not found or already restored.' });
    }

    // Optionally, you may want to adjust other properties such as deleted timestamps or counters

    res.status(200).json({ message: 'Resource successfully restored.', resource: restoredResource });
  } catch (error) {
    console.error('Error undoing resource deletion:', error);
    res.status(500).json({ error: 'Failed to undo resource deletion.' });
  }
});

router.get('/deleted', resourceController.deleteResource)
module.exports = router;
