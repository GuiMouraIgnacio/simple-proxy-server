const cors_proxy = require('cors-anywhere');

// Create the proxy server instance
const proxy = cors_proxy.createServer({
    originWhitelist: [], // Allow all for now
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const urlParam = new URL(req.url, `https://${req.headers.host}`).searchParams.get('url');

    if (!urlParam) {
        res.status(400).send("Usage: /?url=https://example.com");
        return;
    }

    req.url = '/' + urlParam;

    proxy.emit('request', req, res);
};