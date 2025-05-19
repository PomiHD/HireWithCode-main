import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../services/api';

const AcceptChallengePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // 调用API注册用户
      const response = await registerUser(data);

      // 存储用户ID以便在CompleteChallengePage中使用
      localStorage.setItem('userId', response.user._id);
      localStorage.setItem('githubId', data.githubId);
      localStorage.setItem('email', data.email);

      // 导航到完成挑战页面
      navigate('/complete-challenge');
    } catch (err) {
      setError(err.message || '提交失败，请稍后再试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">接受挑战</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="githubId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            GitHub ID
          </label>
          <input
            id="githubId"
            type="text"
            className="form-input"
            disabled={isSubmitting}
            {...register('githubId', { required: 'GitHub ID 是必填项' })}
          />
          {errors.githubId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.githubId.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            邮箱
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            disabled={isSubmitting}
            {...register('email', {
              required: '邮箱是必填项',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '无效的邮箱地址',
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <button type="submit" className="btn w-full" disabled={isSubmitting}>
            {isSubmitting ? '提交中...' : '接受挑战'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcceptChallengePage;
