const http = require('http');

const host = 'localhost';
const port = 8000;
const requestListner = (req, res) => {
  res.writeHead(200);
  res.end("this is the server")
}

const server = http.createServer(requestListner);

server.listen(port, host, () => {
  console.log("server connected to port: ", port);
})
