export default function sendResponse(res, status, msg, error, data) {
  res.status(status).json({
    msg: msg,
    error: error,
    data: data,
  });
}
