import http from 'http';
import { url } from 'inspector';

const config = {
  hostname: 'localhost',
  port: 3000,
};

const server = http.createServer((req, res) => {
  console.log('req', {
    url: req.url,
    method: '',
  });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('hi');
});

server.listen(config.port, config.hostname, () => {
  console.log(`server running at http://${config.hostname}${config.port}`);
});
