// Informacion de red
const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router() // Permite separar cabeceras, metodos, url

// Con esta ruta lo que hacemos es guardar un nuevo mensaje
router.post('/', (req, resp) => {
  // llamamos al metodo 'addMessage' del controlador donde le pasamos el usuario y su mensaje
  controller.addUser(req.body.name)
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

// Con esta ruta lo que hacemos es llamar a los datos que hay en la BD
router.get('/', (req, resp) => {
  // creamos una var con un filto en caso de requerirlo
  const filterUsers = req.query.user || null
  // llamamos al metodo 'getMessage' del controlador, pasandole el filtro en caso de su uso
  controller.getUsers(filterUsers)
  // En caso de que salga todo OK llamamos al compoenente response success
    .then((usersList) => {
      response.success(req, resp, usersList, 200)
    })
    // sino llamamos a error
    .catch(e => {
      response.error(req, resp, 'Unexpected Error', 500, e)
    })
})

router.delete('/:id', (req, resp) => {
  controller.deleteUser(req.params.id)
    .then(() => {
      // console.log(req.body)
      response.success(req, resp, `Usuario eliminado con éxito`, 200)
    })
    // Sino inforamos un error
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    })
})

module.exports = router