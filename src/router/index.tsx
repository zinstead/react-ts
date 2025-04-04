import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import NewsSandbox from '@/pages/NewsSandbox';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/404';
import RightList from '@/pages/right-manage/RightList';

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
          index: true,
          element: <Navigate to={'/home'} />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'right-manage',
          element: <Outlet />,
          children: [
            {
              path: 'right',
              element: <Outlet />,
              children: [
                {
                  path: 'list',
                  element: <RightList />,
                },
              ],
            },
          ],
        },
        {
          path: '*',
          element: <div>未匹配页面</div>,
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
