// Vercel API处理文件
const app = require('../backend/app');

// 使Vercel能够处理API请求
module.exports = async (req, res) => {
  try {
    // 设置req.url以匹配路由结构
    if (req.url.startsWith('/api')) {
      req.url = req.url.replace('/api', '');
    }

    // 将请求传递给Express应用
    return app(req, res);
  } catch (error) {
    console.error('API错误:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};
