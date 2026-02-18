const cors_proxy = require('cors-anywhere');

// Create the proxy server instance
const proxy = cors_proxy.createServer({
    originWhitelist: [], // Allow all for now
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

// This is the entry point for Vercel Serverless Functions
module.exports = (req, res) => {
    proxy.emit('request', req, res);
};