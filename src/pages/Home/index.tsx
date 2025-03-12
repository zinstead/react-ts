import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  }, []);

  return <Outlet />;
};

export default Home;
