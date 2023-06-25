// Example express application adding the parse-server module to expose Parse
// compatible API routes.

import express from 'express'
import server from 'parse-server';
const { ParseServer } = server;
import http from 'http';

const config = {
  databaseURI:
    'mongodb://localhost:27017/',
  appId: 'test',
  masterKey: 'test',
  serverURL: 'http://localhost:1337/parse',
  auth: {
    mfa: {
      enabled: true,
      options: ['TOTP'],
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
    },
  },
};


const app = express();

  const api = new ParseServer(config);
  await api.start();
  app.use('/parse', api.app);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('ok');
});



const port = process.env.PORT || 1337;
const httpServer = http.createServer(app);
httpServer.listen(port, function () {
    console.log('parse-server-example running on port ' + port + '.');
});