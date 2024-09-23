const Resource = require("../models/resource.js");
const User = require("../models/user.js");


module.exports.index = async (req, res) => {
  const { userId } = req.params;
  const { viewOption = 'all', subject: subjectFilter = '' } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let query = {};
    if (viewOption === 'own') {
      query.educator = user._id;
    }
    if (subjectFilter) {
      query.subject = subjectFilter;
    }

    // Fetch resources based on query
    const resources = await Resource.find(query).populate('educator');
    const allSubjects = await Resource.distinct('subject');

    // Respond with educator, resources, and other data
    res.json({
      educator: user,
      resources,
      viewOption,
      subjectFilter,
      allSubjects,
      currentUser: req.user, // Assuming req.user is set up in your middleware
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('username email createdAt');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resources = await Resource.find({ educator: userId }).populate('educator');

    res.json({
      educator: user,
      resources
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports.showResource = async (req, res) => {
  const { role } = req.query;
  try {
    const user = await User.findById(req.params.userId);
    const resource = await Resource.findById(req.params.resourceId);

    res.json({
      educator: user,
      resource,
      role,
      currentUser: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.renderEdit = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const resource = await Resource.findById(req.params.resourceId);

    res.json({
      educator: user,
      resource,
      currentUser: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.updateResource = async (req, res) => {
  const { resourceId } = req.params;
  const { title, description, subject, branch, semester, file } = req.body;
  try {
    const resource = await Resource.findByIdAndUpdate(
      resourceId,
      {
        title,
        description,
        subject,
        branch,
        semester,
        file: req.file ? req.file.filename : file,
      },
      { new: true }
    );

    res.json({ resource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.renderNewResource = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    res.json({
      educator: user,
      currentUser: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.postNewResource = async (req, res) => {
  try {
    const { title, description, subject, branch, semester, file } = req.body;
    const educator = req.user._id;

    const newResource = new Resource({
      title,
      description,
      subject,
      branch,
      semester,
      file: req.file ? req.file.filename : file,
      educator,
    });
    await newResource.save();
    res.json({ resource: newResource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.studentIndex = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    let query = {};
    if (req.query.subject) {
      query.subject = req.query.subject;
    }
    if (req.query.year) {
      query.year = req.query.year;
    }

    const allSubjects = await Resource.distinct("subject");
    const resources = await Resource.find(query).populate("educator");

    res.json({
      educator: user,
      student: user,
      resources,
      subjectFilter: req.query.subject || '',
      yearFilter: req.query.year || '',
      allSubjects,
      currentUser: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.studentShowResource = async (req, res) => {
  const { role } = req.query;
  try {
    const user = await User.findById(req.params.userId);
    const resource = await Resource.findById(req.params.resourceId);

    res.json({
      educator: user,
      resource,
      role,
      currentUser: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.deleteResource = async (req, res) => {
  const { resourceId } = req.params;
  console.log(`Deleting resource with ID: ${resourceId}`); // Add logging
  try {
    const deletedResource = await Resource.findByIdAndDelete(resourceId);
    if (!deletedResource) {
      console.log('Resource not found for deletion.'); // Add logging
      return res.status(404).json({ error: 'Resource not found' });
    }
    console.log('Resource successfully deleted:', deletedResource); // Add logging
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ error: 'Failed to delete resource.' });
  }
};



module.exports.fetchDeletedResources = async (req, res, next)=> {
  try {
    const deletedResources = await Resource.find({ isDeleted: true });
    return deletedResources;
  } catch (error) {
    console.error('Error fetching deleted resources:', error);
    throw new Error('Failed to fetch deleted resources.');
  }
}


// module.exports.deletedResources = async (req, res, next)=>  {
//   try {
    
//     const resourceId= await Resource.findByIdAndDelete(resourceId);
//     return { message: 'Resource permanently deleted.' };
//   } catch (error) {
//     console.error('Error permanently deleting resource:', error);
//     throw new Error('Failed to permanently delete resource.');
//   }
// }
