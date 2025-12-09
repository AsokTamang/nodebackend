import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js';
const PORT = 8000


/*
Challenge 1:

1. Get the name of the directory holding this server.js file and store it to a const ‘__dirname’.
*/
const __dirname = import.meta.dirname;   //this gives us the directory which holds our server.js file

const server = http.createServer((req, res) => {

/*
Challenge 3:

1. Import and call serveStatic and pass it the directory of this current module.
*/
    return serveStatic(__dirname,res) 
  
})

server.listen(PORT, ()=> console.log(`Connected on port: ${PORT}`))
