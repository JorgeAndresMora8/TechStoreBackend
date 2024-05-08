export default function SendResponse(res, httpStatusCode, message){ 
    res.status(httpStatusCode).json(message)
}