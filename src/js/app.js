const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  res.end('server response');
});

const port = 9000;

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`${port}`);
});
