```javascript
import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { getCourses, deleteCourse } from '../api';

function CourseList({ user }) {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses(searchTerm);
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, [searchTerm]);

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id, localStorage.getItem('token'));
      setCourses(courses.filter(course => course._id !== id));
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or instructor"
          className="border p-2 w-full rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(course => (
          <CourseCard key={course._id} course={course} user={user} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default CourseList;
```