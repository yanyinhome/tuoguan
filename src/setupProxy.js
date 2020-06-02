const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://10.237.121.82/inner',
            // target: 'https://zs-test.csc108.com/rest',
            changeOrigin: true,
            pathRewrite:{
                "^/api":""
            }
        })
    );
};
