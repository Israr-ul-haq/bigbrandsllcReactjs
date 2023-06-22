const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/media',
        createProxyMiddleware({
            target: 'http://akeneo.bigbrandsllc.co',
            changeOrigin: true,
        })
    );
};