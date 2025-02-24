import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/404';

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
          <Home />
        </RequireAuth>
      ),
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />,
          index: true,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return element;
};

export default Routes;
