const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require("path");

const app = express();
app.use(express.static('client'));

// const apiProxy = createProxyMiddleware('/api', { target: 'https://flexcharactersheet.herokuapp.com' });
// app.use('/api', apiProxy);
// Add middleware for http proxying
app.use(createProxyMiddleware("/api", {
  "target": "https://flexcharactersheet.herokuapp.com",
  "secure": false,
  "logLevel": "debug",
  "changeOrigin": true
}))

// Render your site
app.use(express.static(__dirname + '/dist/fcs-web'));

// Link index.html of build folder with router.
app.get('/*', (req,res,next) => {
  res.sendFile(path.join(__dirname + '/dist/fcs-web/index.html'));
});

app.listen(4200, () => {
  console.log('Listening on: http://localhost:4200');
});
