const store = require('./store')
const socket = require('../../socket').socket
const config = require('../../config')

// Recibimos el usuario y el mensaje añadir en la BD
function addMessage(chat, user, message, file) {
  // devvolvemos una promesa
  return new Promise((resolve, reject) => {
    // en caso de no contener usuario/mensaje devolvemos un error
    if (!chat, !user || !message) {
      console.error('[messageController] No hay usuario o mensaje')
      return reject('Los datos son incorrectos')
    }

    let filePath = ''
    if (file) {
      filePath = `${config.host}:${config.port}${config.publicRoute}${config.filesRoute}` + file.filename
    }
    // almacenamos los datos
    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: filePath,
    }
    // llamamos al metodo 'add' del componentne store pasandole los datos a almacenar
    store.add(fullMessage)

    socket.io.emit('message', fullMessage)

    // devolvemos el resutlado en caso de success
    resolve(fullMessage)
    
  })
}

// Devolvemos una promesa con el listado de todos los msj
function getMessages(filterUser){
  return new Promise((resolve, reject) => {
    // Si hay, devolvemos el metodo 'list' del store (con o sin filtro)
    resolve(store.list(filterUser))
  })
}

function updateMessage(id, message) {
  // Devolvemos una promesa con el mensaje a buscar y modificar
  return new Promise(async (resolve, reject) => {
    // En caso de que no vengan id o mensaje devolvemos un error
    if (!id || !message) {
      reject('Invalid data')
      return false
    }
    // Sino almacenamos el resultado que nos devulve el componente store
    const resultado = await store.updateText(id, message)
    // Lo devolvemos para mostrarlo
    resolve(resultado)
  })
}

function deleteMessage(id) {
  // Devolvemos una promesa
  return new Promise((resolve, reject) => {
    // Si no hay ID devolvemos el error
    if (!id) {
      reject('Id inválido')
      return false
    }
    // Sino llamamos al metodo del componenet store remove pasandole el id
    store.remove(id)
    // Si es ok volvemos un success
      .then(() => {
        resolve()
      })
      // Sino un error
      .catch(e => {
        reject(e)
      })
  }) 
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
}