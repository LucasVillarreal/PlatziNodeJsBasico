// Informacion de red
const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router() // Permite separar cabeceras, metodos, url

// Con esta ruta lo que hacemos es guardar un nuevo mensaje
router.post('/', (req, resp) => {
  // llamamos al metodo 'addMessage' del controlador donde le pasamos el usuario y su mensaje
  controller.addNewChat(req.body.users)
  // si esta todo bien llamamos al meotod 'success' que esta en la parte de respuesta 
  // pasandole el request, la respuesta, el mensaje y el status
    .then(data => {
      response.success(req, resp, data, 201)
    })
    // sino llamamos al metodo de error pasandole los datos
    .catch(e => {
      response.error(req, resp, 'Información inválida', 400, e)
    })
})

router.get('/:userId', function(req, res) {
  controller.listChats(req.params.userId)
      .then(users => {
          response.success(req, res, users, 200);
      })
      .catch(err => {
          response.error(req, res, 'Internal error', 500, err);
      });
});

module.exports = router