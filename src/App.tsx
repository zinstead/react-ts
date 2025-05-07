import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import NewsSandbox from '@/pages/NewsSandbox';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/404';
import RightList from '@/pages/right-manage/RightList';
import './App.css';

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: 
          <NewsSandbox />
      ,
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

  return <div>{element}</div>;
};

export default App;
