const express = require('express')
const multer = require('multer') // Archivos
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router() // Permite separar cabeceras, metodos, url
const config = require('../../config')


const upload = multer({
  dest: `public/${config.filesRoute}/`,
})

// Con esta ruta lo que hacemos es guardar un nuevo mensaje
router.post('/', upload.single('file'), (req, resp) => {
  // console.log(req.file)
  // llamamos al metodo 'addMessage' del controlador donde le pasamos el usuario y su mensaje
  controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
  // si esta todo bien llamamos al meotod 'success' que esta en la parte de respuesta 
  // pasandole el request, la respuesta, el mensaje y el status
    .then((fullMessage) => {
      response.success(req, resp, fullMessage, 201)
    })
    // sino llamamos al metodo de error pasandole los datos
    .catch(e => {
      response.error(req, resp, 'Información inválida', 400, 'Error en el contenido')
    })
})

// Con esta ruta lo que hacemos es llamar a los datos que hay en la BD
router.get('/', (req, resp) => {
  // creamos una var con un filto en caso de requerirlo
  const filterMessages = req.query.user || null
  // llamamos al metodo 'getMessage' del controlador, pasandole el filtro en caso de su uso
  controller.getMessages(filterMessages)
  // En caso de que salga todo OK llamamos al compoenente response success
    .then((messageList) => {
      response.success(req, resp, messageList, 200)
    })
    // sino llamamos a error
    .catch(e => {
      response.error(req, resp, 'Unexpected Error', 500, e)
    })
})

// Con este metodo modificamos un mensaje 
router.patch('/:id', (req, resp) => {
  console.log(req.params.id)
  // Llamamos al metodo 'updateMessage' del controlador, pasandole el id y el msj
  controller.updateMessage(req.params.id, req.body.message)
  // En caso de que este OK devolvemos un success
    .then((data) => {
      response.success(req, resp, data, 200)
    })
    // Sino un error
    .catch(e => {
      response.error(req, resp, 'Error interno', 500, e)
    })
})

// Con este metodo eliminamos un msj
router.delete('/:id', (req, res) => {
  // Llamamos al metodo 'deleteMessage' del controlador
  controller.deleteMessage(req.params.id)
  // Si esta todo ok devolvemos un succes con un mensaje de notificacion al usuario
    .then(() => {
      response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200)
      console.log(req.params)
    })
    // Sino inforamos un error
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    })
})

module.exports = router
