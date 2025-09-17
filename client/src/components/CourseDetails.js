```javascript
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../api';

function CourseDetails({ user }) {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error('Error fetching course:', err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={course.thumbnailImage} alt={course.title} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-600 mb-2">{course.description}</p>
      <p className="text-gray-800 font-semibold mb-2">Price: ${course.price}</p>
      <p className="text-gray-600 mb-4">Instructor: {course.instructor.email}</p>
      {user?.role === 'student' && (
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Enroll</button>
      )}
      {user?.role === 'admin' && (
        <div>
          <Link to={`/admin/edit-course/${course._id}`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2">Edit</Link>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
        </div>
      )}
    </div>
  );
}

export default CourseDetails;
```