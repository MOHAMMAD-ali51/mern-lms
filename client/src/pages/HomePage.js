
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import SuccessStoryCard from '../components/SuccessStoryCard';
import { getPopularCourses, getSuccessStories } from '../api';

function HomePage() {
  const [popularCourses, setPopularCourses] = useState([]);
  const [successStories, setSuccessStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await getPopularCourses();
        const stories = await getSuccessStories();
        setPopularCourses(courses);
        setSuccessStories(stories);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Hero />
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {popularCourses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {successStories.map(story => (
            <SuccessStoryCard key={story._id} story={story} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
