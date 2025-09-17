```javascript
const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  storyText: { type: String, required: true },
  courseName: { type: String, required: true },
});

module.exports = mongoose.model('SuccessStory', successStorySchema);
```