import { getData } from "../utils/getData";
import { sendResponse } from "../utils/sendResponse";
import { parseJSONBody } from "../utils/parseJSONBody";
import { addNewSighting } from "../utils/addNewSighting";
import { sightingEvents } from "../events/sightingEvents";
import sanitize from "sanitize-html";
import { stories } from "../data/stories.js";
export async function handleGet(res) {
  const content = await getData();
  sendResponse(res, 200, "application/json", JSON.stringify(content)); //as the getData is returning the parsed json data , we must stringify it first
}

function sanitizer(obj) {
  //clean-up function
  for (const k of Object.keys(obj)) {
    //iterating over the keys of json object
    obj[k] = sanitize(obj[k], { allowedTags: ["b"], allowedAttributes: [] }); //no attributes are allowed and only the b tag which is bold tag is been allowed in our sanitize method
  }
  return obj;
}

export async function handlePost(req, res) {
  try {
    const parsedBody = await parseJSONBody(req);
    const newdata = sanitizer(parsedBody);
    await addNewSighting(newdata); //here we are passng the parsed newsighting in our addnewsighting function to add in the existing database
    sightingEvents.emit("sighting-added", newdata); //as soon as the new data of haunted place is added, we are emitting this data using eventemitter instance we created
    sendResponse(res, 201, "application/json", JSON.stringify(newdata));
  } catch (err) {
    sendResponse(res, 400, "application/json", JSON.stringify({ error: err }));
  }
}

export async function handleNews(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  /*
Challenge 1:
  1. Set Content-Type, Cache-Control, and Connection headers
*/

  setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length);
    res.write(
      `data: ${JSON.stringify({ //here we are writing with the stringified json object having event and the story
        'event': "horror story",
        'story': stories[randomIndex],
      })}\n\n`
    ); //here \n\n represents the end of message block

    /*
Challenge 2:
  1. Use res.write() to send an object to the frontend. 

  The object should include:
    - an event property with a descriptive name.
    - a story chosen at random from the stories array.

  Remember, the object is contained in a string which starts with 'data: '. 
  What do you need at the end of the string to signal the end of a message block?

*/
  }, 3000);
}
