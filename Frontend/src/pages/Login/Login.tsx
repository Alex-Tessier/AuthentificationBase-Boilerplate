import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from 'services/authService';


const Login = () => {
  const [userNameOrEmail, setUserNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const loginResponse = await loginUser({
          userNameOrEmail,
          password
        });

        const token = loginResponse.data;
        localStorage.setItem('jwtToken', token);

        navigate('/settings');
        
    } catch (err) {
        setError((err as AxiosError).response?.data as string || 'An error occurred during login');
    }

  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Username or Email</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={userNameOrEmail}
            onChange={e => setUserNameOrEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Connect</button>
        <div className="flex justify-center mt-4">
          <a href="/register" className="text-blue-600 hover:underline text-center">Create an account</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
