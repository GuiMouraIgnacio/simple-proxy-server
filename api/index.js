const cors_proxy = require('cors-anywhere');

// Create the proxy server instance
const proxy = cors_proxy.createServer({
    originWhitelist: [], // Allow all for now
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

module.exports = (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        res.status(400).send("Missing url parameter");
        return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    req.url = targetUrl; 
    proxy.emit('request', req, res);
};