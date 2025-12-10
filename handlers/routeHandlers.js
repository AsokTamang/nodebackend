import { getData } from "../utils/getData";
import { sendResponse } from "../utils/sendResponse";
import { parseJSONBody } from "../utils/parseJSONBody";
import { addNewSighting } from "../utils/addNewSighting";
export async function handleGet(res) {
  const content = await getData();
  sendResponse(res, 200, "application/json", JSON.stringify(content)); //as the getData is returning the parsed json data , we must stringify it first
}

export async function handlePost(req, res) {
  try {
    const parsedBody = await parseJSONBody(req);
    await addNewSighting(parsedBody)  //here we are passng the parsed newsighting in our addnewsighting function to add in the existing database
    sendResponse(res, 201, "application/json", JSON.stringify(parsedBody));  
  } catch (err) {
    sendResponse(res, 400, "application/json", JSON.stringify({ error: err }));
  }
}
