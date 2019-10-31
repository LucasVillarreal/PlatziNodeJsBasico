const Model = require('./model')

function addMessage(message) {
  // almacenamos los datos que recibimos
  const myMessage = new Model(message)
  // guardamos en la BD
  myMessage.save()
}

// list
async function getMessages(filterMessage) {
  return new Promise((resolve, reject) => {
    // almacenamos un filto vacio
    let filter = {}
    // si no viene vacio
    if (filterMessage !== null) {
      // Almacenamos el nombre del usuario que se quiere buscar
      filter = { user: filterMessage }
    }
    // Almacenamos el resultado con el modelo creado
    Model.find(filter)
      .populate('user')
      .exec((error, populated) => {
        if(error) reject(error)
        resolve(populated)
      })
  })
}

// Recibimos el id y el mensaje
async function updateText(id, message){
  // Id del mensaje encontrado
  const foundMessage = await Model.findOne({
    _id: id
  })

  // almacenamos el mensaje que llega nuevo al mensaje anterior guardado
  foundMessage.message = message
  // guardamos el mensaje actualizado
  const newMessage = await foundMessage.save()

  return newMessage
}

function removeMessage(id){
  // Llamamos al metodo que elminia un registro
  return Model.deleteOne(({
    _id: id
  }))
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText: updateText,
  remove: removeMessage

}

// Edv63mwZKm3XFewH