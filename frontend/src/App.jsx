import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import WelcomePage from './pages/WelcomePage';
import GuidePage from './pages/GuidePage';
import AcceptChallengePage from './pages/AcceptChallengePage';
import CompleteChallengePage from './pages/CompleteChallengePage';
import ErrorPage from './pages/ErrorPage';
import NotFound from './pages/NotFound';

// 创建路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: 'guide',
        element: <GuidePage />,
      },
      {
        path: 'accept-challenge',
        element: <AcceptChallengePage />,
      },
      {
        path: 'complete-challenge',
        element: <CompleteChallengePage />,
      },
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
