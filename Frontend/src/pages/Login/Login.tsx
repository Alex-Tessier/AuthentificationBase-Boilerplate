import { useState } from 'react';
import axios from 'axios';


const Login = () => {
  const [userNameOrEmail, setUserNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const loginResponse = axios.post('/api/login', {
          userNameOrEmail,
          password
        });

        console.log(loginResponse)
    } catch (err) {
        setError((err as Error).message);
    }

  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={userNameOrEmail}
            onChange={e => setUserNameOrEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Mot de passe</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Se connecter</button>
        <div className="flex justify-center mt-4">
          <a href="/register" className="text-blue-600 hover:underline text-center">Créer un compte</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
