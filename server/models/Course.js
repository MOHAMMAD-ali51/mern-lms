
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  thumbnailImage: { type: String, required: true },
  isPopular: { type: Boolean, default: false },
  enrollments: { type: Number, default: 0 },
});

module.exports = mongoose.model('Course', courseSchema);
