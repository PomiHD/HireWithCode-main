// 根据运行环境确定API基础URL
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/api' // 生产环境使用相对路径
    : 'http://localhost:5000/api'; // 开发环境使用本地地址

/**
 * 注册用户
 * @param {Object} userData - 包含githubId和email
 * @returns {Promise} - 返回用户数据
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '注册失败');
    }

    return await response.json();
  } catch (error) {
    console.error('注册用户时出错:', error);
    throw error;
  }
};

/**
 * 提交挑战
 * @param {Object} submissionData - 包含userId, githubRepo和vercelUrl
 * @returns {Promise} - 返回提交数据
 */
export const submitChallenge = async (submissionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '提交失败');
    }

    return await response.json();
  } catch (error) {
    console.error('提交挑战时出错:', error);
    throw error;
  }
};
