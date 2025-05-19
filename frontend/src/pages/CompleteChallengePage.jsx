import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitChallenge } from '../services/api';

const CompleteChallengePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 获取用户ID，如果没有则重定向回接受挑战页面
    const userId = localStorage.getItem('userId');
    const githubId = localStorage.getItem('githubId');
    const email = localStorage.getItem('email');

    if (!userId) {
      navigate('/accept-challenge');
      return;
    }

    setUserData({ userId, githubId, email });
  }, [navigate]);

  const onSubmit = async (data) => {
    if (!userData?.userId) {
      setError('用户信息不存在，请重新注册');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 调用API提交挑战
      await submitChallenge({
        userId: userData.userId,
        ...data,
      });

      setSubmitted(true);
    } catch (err) {
      setError(err.message || '提交失败，请稍后再试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">提交成功！</h1>
        <p className="mb-6">
          感谢您参与 HireWithCode 挑战，我们会尽快审核您的提交。
        </p>
        <div className="mt-8">
          <p className="text-sm text-gray-600">
            GitHub ID: {userData.githubId}
          </p>
          <p className="text-sm text-gray-600">邮箱: {userData.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">完成挑战</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="githubRepo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            GitHub 仓库 URL
          </label>
          <input
            id="githubRepo"
            type="text"
            className="form-input"
            placeholder="https://github.com/yourusername/your-repo"
            disabled={isSubmitting}
            {...register('githubRepo', {
              required: 'GitHub 仓库 URL 是必填项',
              pattern: {
                value: /^https:\/\/github\.com\/[\w-]+\/[\w-]+/,
                message: '请输入有效的 GitHub 仓库 URL',
              },
            })}
          />
          {errors.githubRepo && (
            <p className="mt-1 text-sm text-red-600">
              {errors.githubRepo.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="vercelUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Vercel 在线体验地址
          </label>
          <input
            id="vercelUrl"
            type="text"
            className="form-input"
            placeholder="https://your-project.vercel.app"
            disabled={isSubmitting}
            {...register('vercelUrl', {
              required: 'Vercel URL 是必填项',
              pattern: {
                value: /^https:\/\/([\w-]+\.)+vercel\.app/,
                message: '请输入有效的 Vercel URL',
              },
            })}
          />
          {errors.vercelUrl && (
            <p className="mt-1 text-sm text-red-600">
              {errors.vercelUrl.message}
            </p>
          )}
        </div>

        <div>
          <button type="submit" className="btn w-full" disabled={isSubmitting}>
            {isSubmitting ? '提交中...' : '提交作品'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteChallengePage;
