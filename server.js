import http from "http";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(
    `<html>
      <h1>The server is working</h1>
    </html>`
  );
});
server.listen(8000, () => console.log("server is running"));
