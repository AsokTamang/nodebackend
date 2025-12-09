// handleGet

/*
Challenge:
1. Export a function called handleGet(). 
2. It should:
   - use getData() to get the data
   - stringify that data
   - use sendResponse() to serve it
   
Open the browser and load the sightings page to see if it works.
*/

// handlePost
import { getData } from "../utils/getData";
import { sendResponse } from "../utils/sendResponse";
export async function handleGet(res) {
  const content = await getData();
  sendResponse(res, 200, "application/json", JSON.stringify(content));  //as the getData is returning the parsed json data , we must stringify it first
}
