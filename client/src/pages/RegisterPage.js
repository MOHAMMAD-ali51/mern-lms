```javascript
import RegisterForm from '../components/RegisterForm';

function RegisterPage({ setUser }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <RegisterForm setUser={setUser} />
    </div>
  );
}

export default RegisterPage;
```