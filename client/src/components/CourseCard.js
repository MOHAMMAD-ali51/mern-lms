
import { Link } from 'react-router-dom';

function CourseCard({ course, user, onDelete }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={course.thumbnailImage} alt={course.title} className="w-full h-48 object-cover rounded mb-2" />
      <h3 className="text-lg font-bold">{course.title}</h3>
      <p className="text-gray-600">{course.description}</p>
      <p className="text-gray-800 font-semibold">Price: ${course.price}</p>
      <p className="text-gray-600">Instructor: {course.instructor.email}</p>
      <div className="mt-4">
        <Link to={`/courses/${course._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">View Details</Link>
        {user?.role === 'student' && (
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Enroll</button>
        )}
        {user?.role === 'admin' && (
          <>
            <Link to={`/admin/edit-course/${course._id}`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2">Edit</Link>
            <button onClick={() => onDelete(course._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
