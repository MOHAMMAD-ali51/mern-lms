
import { Link } from 'react-router-dom';

function Header({ user, onLogout }) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">MERN LMS</Link>
        </h1>
        <nav className="flex items-center">
          <Link to="/courses" className="mr-4 hover:underline">Courses</Link>
          {user ? (
            <>
              <span className="mr-4">{user.email} ({user.role})</span>
              {user.role === 'admin' && <Link to="/admin" className="mr-4 hover:underline">Admin Dashboard</Link>}
              <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:underline">Login</Link>
              <Link to="/register" className="mr-4 hover:underline">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
