const http = require("http");

const server = new http.Server();

server.addListener("request", (request, response) => {
  response.write("Hello World");
  response.end();
});

server.listen(3000);