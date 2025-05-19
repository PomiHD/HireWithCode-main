import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-8">页面不存在</p>
      <Link to="/" className="btn">
        返回首页
      </Link>
    </div>
  );
}
