import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/tokenUtils';

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Settings</h1>
      <p className="text-lg text-gray-700 mb-8">Manage your account settings and preferences.</p>
      <button 
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
