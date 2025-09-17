
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Course = require('./models/Course');
const SuccessStory = require('./models/SuccessStory');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await SuccessStory.deleteMany({});

    // Seed Users
    const admin = await new User({
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    }).save();

    const student = await new User({
      email: 'student@example.com',
      password: await bcrypt.hash('student123', 10),
      role: 'student',
    }).save();

    // Seed Courses
    const courses = [
      {
        title: 'Introduction to JavaScript',
        description: 'Learn the basics of JavaScript programming.',
        price: 49.99,
        instructor: admin._id,
        thumbnailImage: 'https://example.com/js.jpg',
        isPopular: true,
        enrollments: 100,
      },
      {
        title: 'React for Beginners',
        description: 'Build modern web apps with React.',
        price: 59.99,
        instructor: admin._id,
        thumbnailImage: 'https://example.com/react.jpg',
        isPopular: true,
        enrollments: 80,
      },
      {
        title: 'Node.js Essentials',
        description: 'Master backend development with Node.js.',
        price: 39.99,
        instructor: admin._id,
        thumbnailImage: 'https://example.com/nodejs.jpg',
        enrollments: 50,
      },
      {
        title: 'MongoDB Deep Dive',
        description: 'Explore NoSQL databases with MongoDB.',
        price: 44.99,
        instructor: admin._id,
        thumbnailImage: 'https://example.com/mongodb.jpg',
        enrollments: 30,
      },
    ];
    await Course.insertMany(courses);

    // Seed Success Stories
    const stories = [
      {
        studentName: 'John Doe',
        storyText: 'This course changed my career!',
        courseName: 'Introduction to JavaScript',
      },
      {
        studentName: 'Jane Smith',
        storyText: 'React made me a better developer.',
        courseName: 'React for Beginners',
      },
    ];
    await SuccessStory.insertMany(stories);

    console.log('Database seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  });
