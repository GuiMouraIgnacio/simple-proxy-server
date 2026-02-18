const cors_proxy = require('cors-anywhere');

const proxy = cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [],   // Allow testing in browser
    removeHeaders: ['cookie', 'cookie2']
});

module.exports = (req, res) => {
    // 1. Set the CORS headers so the browser (JSFiddle) is happy
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Accept, Authorization');

    // 2. Handle the "Preflight" (OPTIONS) request immediately
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 4. Pass the request to the proxy
    proxy.emit('request', req, res);
};