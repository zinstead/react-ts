import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useRoutes,
} from 'react-router-dom';

const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <div>
          <div>主页</div>
          <Link to={'/protected'}>受保护页面</Link>
        </div>
      ),
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/public',
      element: <PublicPage />,
    },
    {
      path: '/protected',
      element: (
        <Auth>
          <ProtectedPage />
        </Auth>
      ),
    },
  ]);

  return <div>{routes}</div>;
};

function PublicPage() {
  return <div>这是公共页面</div>;
}

function ProtectedPage() {
  return <div>这是受保护页面</div>;
}

function LoginPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const onLogin = () => {
    setTimeout(() => {
      sessionStorage.setItem('user', 'alan');
      navigate(state.from.pathname || '/', { replace: true });
    }, 1000);
  };

  return (
    <div>
      <button onClick={onLogin}>登录</button>
    </div>
  );
}

interface IAuth {
  children: JSX.Element;
}

const Auth: React.FC<IAuth> = props => {
  const { children } = props;
  const user = sessionStorage.getItem('user');
  const location = useLocation();
  if (!user) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }
  return children;
};

export default App;
