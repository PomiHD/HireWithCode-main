import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto navigate to guide page after 2 seconds
    const timer = setTimeout(() => {
      navigate('/guide');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 animate-fadeIn">
      <img src="/logo.png" alt="HireWithCode Logo" className="w-32 h-32 mb-6" />
      <h1 className="text-2xl md:text-3xl text-center text-gray-800 font-medium">
        欢迎来到 infist 线上面试环节，期待你的加入！
      </h1>
    </div>
  );
};

export default WelcomePage;
