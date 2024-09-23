const User = require("../models/user");

module.exports.renderEducatorProfile = async (req, res, next) => {
  const user = await User.findById(req.user);
  const { id } = req.params;
  if (user._id.toString() !== id) {
    return next(new ExpressError("Unauthorized access to profile.", 403)); // Custom error
  }
  res.json( { educator: user });
};

module.exports.renderEditEducatorProfile = async (req, res, next) => {
  const user = await User.findById(req.user);
  res.json( { educator: user });
};

module.exports.updateEducatorProfile = async (req, res, next) => {
  console.log(`Received PUT request to /educator/${req.params.id}/edit`);
  try {
    const { name, email, username, collegeName, experience, role } = req.body;

    // Ensure the new username does not conflict with an existing one
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== req.params.id) {
      console.log(`Username conflict: ${username} is already taken.`);
      return res.status(409).json({ error: `Username ${username} is already taken.` });
    }

    // Update educator information
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, username, collegeName, experience, role },
      { new: true, runValidators: true }
    );

    // Optionally, send updated user data as response
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error("Error updating educator profile:", error);
    res.status(500).json({ error: 'Failed to update profile. Please try again.' });
  }
};


module.exports.renderStudentProfile = async (req, res) => {
  const user = await User.findById(req.user);
  res.json( { student: user });
};

module.exports.renderEditStudentProfile = async (req, res) => {
  const user = await User.findById(req.user);
  res.json( { student: user });
};

module.exports.updateStudentProfile = async (req, res) => {
  console.log(`Received PUT request to /student/${req.params.id}/edit`);

  try {
    const {
      name,
      email,
      username,
      collegeName,
      branch,
      year,
      role,
    } = req.body;

    // Fetch current username from the database or wherever it's stored
    const userId = req.params.id;
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUsername = currentUser.username;
    const newUsername = username;

    if (newUsername && newUsername !== currentUsername) {
      // Check if the new username already exists
      const existingUser = await User.findOne({ username: newUsername });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
    }

    // Update the user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        username,
        collegeName,
        branch,
        year,
        role,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User update failed' });
    }

    // Respond with the updated user data
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
