
import { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

function RegisterForm({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(email, password, role);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      setUser(data.user);
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      console.error('Registration error:', err);
      alert('Error registering user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 w-full rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 w-full rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        className="border p-2 mb-2 w-full rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Register</button>
    </form>
  );
}

export default RegisterForm;
