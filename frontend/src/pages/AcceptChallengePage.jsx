import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AcceptChallengePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Here we would normally send data to the backend
    console.log('Form data submitted:', data);

    // For now, just store in localStorage and navigate
    localStorage.setItem('challengeUser', JSON.stringify(data));
    navigate('/complete-challenge');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">接受挑战</h1>
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
          <button type="submit" className="btn w-full">
            接受挑战
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcceptChallengePage;
