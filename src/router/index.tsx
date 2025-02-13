import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import Dashboard from '@/components/Dashboard';
import Home from '@/components/Home';
import Login from '@/components/Login';

interface IAuth {
  children: JSX.Element;
}

const RequireAuth: React.FC<IAuth> = props => {
  const { children } = props;
  const user = sessionStorage.getItem('user');
  const location = useLocation();
  // if (!user) {
  //   return <Navigate to={'/login'} state={{ from: location }} replace />;
  // }
  return children;
};

const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: (
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      ),
      children: [
        {
          path: '/home',
          element: <Home />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return element;
};

export default Routes;
