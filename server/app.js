const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const cors = require('cors');
const MongoStore = require('connect-mongo');


// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/EducationResource");
  console.log("MongoDB Connected");
}

main().catch(err => {
  console.error("MongoDB Connection Error:", err);
});

// Middleware
app.use(express.static(path.join(__dirname, 'client/public')));
app.use(cors(
  {origin: 'http://localhost:5173',
    credentials : true
  }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({
  secret: "My name is Amena",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/EducationResource' }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));
// Passport initialization
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Middleware to set currentUser and flash messages
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/users.js');
const resourceRoutes = require('./routes/resources.js');
const fileRoutes = require('./routes/file.js'); // Import the file routes
app.use(fileRoutes);
app.use('/', authRoutes);
app.use('/profile', userRoutes);
app.use('/resources', resourceRoutes);


// Serve React application from the client build
app.use(express.static(path.join(__dirname, 'client/public')));



// Error handling middleware
// app.use((req, res, next) => {
//   next(new ExpressError("Page Not Found", 404));
// });

// app.use((err, req, res, next) => {
//   const { statusCode = 500 } = err;
//   if (!err.message) err.message = "Oh no, Something went wrong";
//   res.status(statusCode).json({ error: err.message }); // Send error as JSON
// });



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
