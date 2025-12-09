import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";
import { getContentType } from "./getContentType.js";

export async function serveStatic(req, res, baseDir) {
  /*
Challenge: 
  1. Write code below to serve files from our public directory.
     
     Don’t worry about handling errors for now.
     hint.md for help!
*/
  const publ = path.join(baseDir, "public"); //this points to the public dir
  const filePath = path.join(publ, req.url === "/" ? "index.html" : req.url); //this points to index.html if the req url is / otherwise just to the page where the url of the req matches
  const extensions = path.extname(filePath); //this gives us the extensions of the filepath that we are displaying

  try {
    const content = await fs.readFile(filePath);
    sendResponse(res, 200, getContentType(extensions), content); //here for the content-type we are using getcontenttype function by passing the extensions as parameter
  } catch (err) {
    /*
Challenge:

 If the error code is “ENOENT”, serve the 404.html page.  
 If there’s another error, serve a 500 with this string: 
 `<html><h1>Server Error: ${err.code}</h1></html>`. 

The Content-Type for the 500 can be ‘text/html’.
*/

    if (err.code === "ENOENT") {
      const filepath = path.join(publ, "404.html");
      const content = await fs.readFile(filepath); //so we are reading the 404.html file
      sendResponse(res, 404, "text/html", content);
    } else {
      sendResponse(
        res,
        500,
        "text/html",
        `<html><h1>Server Error: ${err.code}</h1></html>`
      );
    }
  }
}
