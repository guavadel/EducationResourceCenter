const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  educator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  student:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  subject: String,
  branch: String,
  semester: String,
  file: String
}, { timestamps: true });

module.exports = mongoose.model('Resource', ResourceSchema);
