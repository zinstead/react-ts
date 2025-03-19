import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const NewsSandbox = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, []);

  return <Outlet />;
};

export default NewsSandbox;
