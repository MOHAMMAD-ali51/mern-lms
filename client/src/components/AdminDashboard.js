```javascript
import { useState } from 'react';
import { createCourse, createSuccessStory } from '../api';

function AdminDashboard() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: '',
    instructor: '',
    thumbnailImage: '',
  });
  const [storyData, setStoryData] = useState({
    studentName: '',
    storyText: '',
    courseName: '',
  });

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse({ ...courseData, instructor: localStorage.getItem('userId') }, localStorage.getItem('token'));
      alert('Course created successfully');
      setCourseData({ title: '', description: '', price: '', instructor: '', thumbnailImage: '' });
    } catch (err) {
      console.error('Error creating course:', err);
      alert('Error creating course');
    }
  };

  const handleStorySubmit = async (e) => {
    e.preventDefault();
    try {
      await createSuccessStory(storyData, localStorage.getItem('token'));
      alert('Success story created successfully');
      setStoryData({ studentName: '', storyText: '', courseName: '' });
    } catch (err) {
      console.error('Error creating success story:', err);
      alert('Error creating success story');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-bold mb-2">Add New Course</h3>
          <form onSubmit={handleCourseSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="border p-2 mb-2 w-full rounded"
              value={courseData.title}
              onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="border p-2 mb-2 w-full rounded"
              value={courseData.description}
              onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="border p-2 mb-2 w-full rounded"
              value={courseData.price}
              onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Thumbnail URL"
              className="border p-2 mb-2 w-full rounded"
              value={courseData.thumbnailImage}
              onChange={(e) => setCourseData({ ...courseData, thumbnailImage: e.target.value })}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Course</button>
          </form>
        </div>
        <div className="border rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-bold mb-2">Add Success Story</h3>
          <form onSubmit={handleStorySubmit}>
            <input
              type="text"
              placeholder="Student Name"
              className="border p-2 mb-2 w-full rounded"
              value={storyData.studentName}
              onChange={(e) => setStoryData({ ...storyData, studentName: e.target.value })}
            />
            <textarea
              placeholder="Story Text"
              className="border p-2 mb-2 w-full rounded"
              value={storyData.storyText}
              onChange={(e) => setStoryData({ ...storyData, storyText: e.target.value })}
            />
            <input
              type="text"
              placeholder="Course Name"
              className="border p-2 mb-2 w-full rounded"
              value={storyData.courseName}
              onChange={(e) => setStoryData({ ...storyData, courseName: e.target.value })}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Story</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
```