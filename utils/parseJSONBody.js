export async function parseJSONBody(req) {
  try {
    let body = "";
    for await (const chunk of req) {
      //in the req of the node js , there are load of chunks of datas that are incoming asynchronously , thats why we are using the for loop and await on these chunks of datas ,added in the body
      body += chunk;
    }
    return JSON.parse(body);  //JSON.parse is used for parsing the datas
  } catch (err) {
    throw new Error(`Invalid JSON format: ${err}`);
  }
}
