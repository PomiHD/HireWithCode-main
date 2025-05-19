import { useRouteError, Link, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error('Route error:', error);

  let message = '发生了未知错误';

  if (isRouteErrorResponse(error)) {
    // Error is a response from a route (like 404)
    if (error.status === 404) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
          <h1 className="text-3xl font-bold mb-4">404</h1>
          <p className="text-gray-600 mb-8">页面不存在</p>
          <Link to="/" className="btn">
            返回首页
          </Link>
        </div>
      );
    }
    message = error.statusText || error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-4">出错了！</h1>
      <p className="text-gray-600 mb-8">{message}</p>
      <Link to="/" className="btn">
        返回首页
      </Link>
    </div>
  );
}
