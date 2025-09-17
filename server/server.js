```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin Middleware
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// User Schema
const User = require('./models/User');
const Course = require('./models/Course');
const SuccessStory = require('./models/SuccessStory');

// User Routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: user._id, email, role } });
  } catch (err) {
    res.status(400).json({ message: 'Error registering user', error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, email, role: user.role } });
  } catch (err) {
    res.status(400).json({ message: 'Error logging in', error: err.message });
  }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching user', error: err.message });
  }
});

// Course Routes
app.post('/api/courses', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, description, price, instructor, thumbnailImage } = req.body;
  try {
    const course = new Course({ title, description, price, instructor, thumbnailImage });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: 'Error creating course', error: err.message });
  }
});

app.put('/api/courses/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ message: 'Error updating course', error: err.message });
  }
});

app.delete('/api/courses/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting course', error: err.message });
  }
});

app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'email');
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching courses', error: err.message });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id).populate('instructor', 'email');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching course', error: err.message });
  }
});

app.get('/api/courses/popular', async (req, res) => {
  try {
    const courses = await Course.find({ isPopular: true }).populate('instructor', 'email');
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching popular courses', error: err.message });
  }
});

// Success Story Routes
app.post('/api/success-stories', authMiddleware, adminMiddleware, async (req, res) => {
  const { studentName, storyText, courseName } = req.body;
  try {
    const story = new SuccessStory({ studentName, storyText, courseName });
    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ message: 'Error creating success story', error: err.message });
  }
});

app.get('/api/success-stories', async (req, res) => {
  try {
    const stories = await SuccessStory.find();
    res.status(200).json(stories);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching success stories', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```