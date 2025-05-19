import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-4">出错了！</h1>
      <p className="text-gray-600 mb-8">
        {error.statusText || error.message || '发生了未知错误'}
      </p>
      <Link to="/" className="btn">
        返回首页
      </Link>
    </div>
  );
}
