export default {
  // 支持值为 Object 和 Array
  'GET /index.php/Home/Confirm': require('./mock/newHomeInfo.json'),

  // GET POST 可省略
  'GET /index.php/Home/BasicInfo/get_info': require('./mock/basicInfo.json'),
  'GET /index.php/Home/Confirm/allfile': require('./mock/fileInfo.json'),

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },

  // Forward 到另一个服务器
  // 'GET /assets/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  // 'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',
};
