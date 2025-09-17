```javascript
const API_URL = 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const registerUser = async (email, password, role) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getCourses = async (search = '') => {
  const response = await fetch(`${API_URL}/courses?search=${search}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getCourseById = async (id) => {
  const response = await fetch(`${API_URL}/courses/${id}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getPopularCourses = async () => {
  const response = await fetch(`${API_URL}/courses/popular`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getSuccessStories = async () => {
  const response = await fetch(`${API_URL}/success-stories`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const createCourse = async (courseData, token) => {
  const response = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const updateCourse = async (id, courseData, token) => {
  const response = await fetch(`${API_URL}/courses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const deleteCourse = async (id, token) => {
  const response = await fetch(`${API_URL}/courses/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const createSuccessStory = async (storyData, token) => {
  const response = await fetch(`${API_URL}/success-stories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(storyData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
```