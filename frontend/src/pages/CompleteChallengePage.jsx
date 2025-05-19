import { useForm } from 'react-hook-form';
import { useState } from 'react';

const CompleteChallengePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    // Here we would normally send data to the backend
    console.log('Submission data:', data);

    // For now, just store in localStorage and show success
    const userInfo = JSON.parse(localStorage.getItem('challengeUser') || '{}');
    const submission = {
      ...userInfo,
      ...data,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem('submission', JSON.stringify(submission));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">提交成功！</h1>
        <p className="mb-6">
          感谢您参与 HireWithCode 挑战，我们会尽快审核您的提交。
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">完成挑战</h1>
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
          <button type="submit" className="btn w-full">
            提交作品
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteChallengePage;
