const http = require('http');
const { manejarRutas } = require('./routes');

const server = http.createServer((req, res) => {
  manejarRutas(req, res);
});

server.listen(3000, () => {
  console.log('Server is running on port: 3000');
});