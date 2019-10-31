const statusMessage = {
  '200': 'Ok',
  '201': 'Created',
  '400': 'Invalid format',
  '500': 'Internal error'
}

// Metodo que usaremos cuando querramos devolver un mensaje de OK
exports.success = (req, resp, message, status) => {
  let statusCode = status
  let statusMessage = message
  if (!status) {
    status = 200
  }
  if(!message){
    statusMessage = statusMessage[status]
  }
  resp.status(statusCode).send({
    error: 'No hubo errores',
    body: statusMessage
  })
}

// Mensaje de ERROR
exports.error = (req, resp, message, status, details) => {
  console.error('[Response error]: ' + details)

  resp.status( status || 500).send({
    error: message,
    body: ''
  })
}