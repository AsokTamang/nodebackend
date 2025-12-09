export function sendResponse(res,code,headertype,payload) {
   res.statusCode = code;
   res.setHeader('Content-Type',headertype);
   res.end(payload);

}