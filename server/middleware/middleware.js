const ExpressError = require('../helpers/expressError');

const User = require("../models/user.js");
const Resource = require("../models/resource.js");



module.exports.storeReturnTo = (req, res, next)=>{
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
module.exports.isLoggedIn = (req, res, next)=>{
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}


module.exports.alreadyLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.originalUrl === '/') {
      if (req.user.role === 'educator') {
        return res.redirect(`/resources/manage/${req.user._id}`);
      } else if (req.user.role === 'student') {
        return res.redirect(`/resources/view/${req.user._id}`);
      }
    };

    if (req.originalUrl.startsWith('/auth/login') || req.originalUrl === '/register') {
      if (req.user.role === 'educator') {
        return res.redirect(`/resources/manage/${req.user._id}`);
      } else if (req.user.role === 'student') {
        return res.redirect(`/resources/view/${req.user._id}`);
      }
    }
  }
  next();
};

  
  // Middleware to check if user has required role
module.exports.getUserRole=(req, res) =>{
  return res.json({ user: req.user });
  }
  module.exports.checkObjectId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    next();
  };


// module.exports.validateBook = (req, res, next) => {
//     const { error } = bookSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }
// module.exports.validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

module.exports.isEducator = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user._id);
      if (user && user.role === 'educator') {
        req.user = user; // Store user in request object for later use if needed
        return next();
      } else {
        return res.redirect(`/`);
      }
    }
  } catch (error) {
    console.error('Error in isEducator middleware:', error);
    res.redirect('/'); // Handle error redirect as needed
  }
};

module.exports.isStudent = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user._id);
      if (user && user.role === 'student') {
        req.user = user; // Store user in request object for later use if needed
        return next();
      } else {
        
        return res.redirect(`/`);
      }
    } else {
      res.redirect(`/auth/login?role=student`);
    }
  } catch (error) {
    console.error('Error in isStudent middleware:', error);
    res.redirect('/'); // Handle error redirect as needed
  }
};

module.exports.preventCaching = (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
};


