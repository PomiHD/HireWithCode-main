// Vercel API处理文件
const app = require('../backend/app');

// 使Vercel能够处理API请求
module.exports = (req, res) => {
  // 设置req.url以匹配路由结构
  // 移除前缀'/api'以匹配backend应用中的路由
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace('/api', '');
  }

  return app(req, res);
};
