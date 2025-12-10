import { getData } from "../utils/getData";
import { sendResponse } from "../utils/sendResponse";
import { parseJSONBody } from "../utils/parseJSONBody";
import { addNewSighting } from "../utils/addNewSighting";
import { sightingEvents } from "../events/sightingEvents";
import sanitize from "sanitize-html";
export async function handleGet(res) {
  const content = await getData();
  sendResponse(res, 200, "application/json", JSON.stringify(content)); //as the getData is returning the parsed json data , we must stringify it first
}

function sanitizer(obj) {  //clean-up function
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
    sightingEvents.emit('sighting-added',newdata);    //as soon as the new data of haunted place is added, we are emitting this data using eventemitter instance we created 
    sendResponse(res, 201, "application/json", JSON.stringify(newdata));
  } catch (err) {
    sendResponse(res, 400, "application/json", JSON.stringify({ error: err }));
  }
}
