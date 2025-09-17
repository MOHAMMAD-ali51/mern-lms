
import LoginForm from '../components/LoginForm';

function LoginPage({ setUser }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <LoginForm setUser={setUser} />
    </div>
  );
}

export default LoginPage;
