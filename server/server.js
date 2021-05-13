const express = require('express');
const path = require('path');

const port = process.env.PORT || 5000;

const server = express();
const http = require('http');

const hostname = '127.0.0.1';

server.use(express.static(path.resolve(__dirname, '../client/build')));


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
server.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});