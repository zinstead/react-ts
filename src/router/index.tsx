import { useRoutes } from 'react-router-dom';
import Home from '@/pages/Home';
import NewsSandbox from '@/pages/NewsSandbox';
import Login from '@/pages/Login';
import NotFound from '@/pages/404';

interface IAuth {
  children: JSX.Element;
}

const RequireAuth: React.FC<IAuth> = props => {
  const { children } = props;
  // const user = sessionStorage.getItem('user');
  // const location = useLocation();
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
          <NewsSandbox />
        </RequireAuth>
      ),
      children: [
        {
          path: 'home',
          element: <Home />,
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
