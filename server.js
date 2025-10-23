const http = require('http');
const httpProxy = require('http-proxy');

// 中継先（ESP32がアクセスするHTTPサーバー）
const target = 'http://your-esp32-server.local'; // ESP32のHTTPサーバーURL
// プロキシサーバー作成
const proxy = httpProxy.createProxyServer({
  target: target,
  changeOrigin: true,
  secure: false
});

// HTTPSで受けたリクエストをHTTPに中継
http.createServer((req, res) => {
  proxy.web(req, res, {}, (err) => {
    console.error('Proxy error:', err);
    res.writeHead(502);
    res.end('Bad Gateway');
  });
}).listen(process.env.PORT || 3000, () => {
  console.log('Proxy server running');
});
