import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/tokenUtils';

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      navigate('/login');
    }
  };

  return { logout: handleLogout };
};

export default useLogout;
