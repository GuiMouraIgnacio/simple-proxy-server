const cors_proxy = require('cors-anywhere');

// Listen on the port provided by Vercel
const port = process.env.PORT || 8080;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins for now
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, '0.0.0.0', () => {
    console.log('Running CORS Anywhere on port ' + port);
});