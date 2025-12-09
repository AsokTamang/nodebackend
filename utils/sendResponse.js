export function sendResponse(res,code,headertype,payload) {
   res.statusCode = code;
   res.setHeader(headertype);
   res.end(payload);

}