const User = require("../models/user");
const passport = require("passport");

// Removed renderRegister and renderLogin as they are not needed for API responses
// Example backend code using Express.js and Passport.js

module.exports.register = async (req, res, next) => {
  const { name, email, username, password, collegeName, experience, role } = req.body;
  
  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists. Please choose a different one." });
    }

    // Create new user instance
    const user = new User({ name, email, username, role, collegeName, experience });
    
    // Register the user with password
    const registeredUser = await User.register(user, password);

    // Log in the registered user
    req.logIn(registeredUser, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Registration successful", user: registeredUser });
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};



module.exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // Optionally, clear sensitive data from user object before sending to client
      const { _id, username, role } = user;
      res.json({ user: { _id, username, role } });
    });
  })(req, res, next);
};





module.exports.logout = (req, res, next) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out successfully" });
    console.log('logged out backend');
  });
};
