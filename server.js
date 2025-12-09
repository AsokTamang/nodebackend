import http from "http";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  //we also have a res.writeHead method (statuscode , {'Content-Type':'application/json'})  where we can directly send the status code along with the content type and access-control-allow-methods with the method values ,and this is in a object
  //inorder to get the dir name of the current module that we are working on
  //we must use import.meta
  const __dirname = import.meta.dirname;
  
  
  res.end(
    `<html>
      <h1>The server is working</h1>
    </html>`
  );
});
server.listen(8000, () => console.log("server is running"));
