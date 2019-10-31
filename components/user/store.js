// Logica del almacenamiento
const Model = require('./model')

function addUser(user) {
  // almacenamos los datos que recibimos
  const myUser = new Model(user)
  // guardamos en la BD
  return myUser.save()
}

// list
async function getUsers(filterUser) {
  // almacenamos un filto vacio
  let filter = {}
  // si no viene vacio
  if (filterUser !== null) {
    // Almacenamos el nombre del usuario que se quiere buscar
    filter = { user: filterUser }
  }
  // Almacenamos el resultado con el modelo creado
  const users = Model.find(filter)
  // Lo retornamos para mostrarlo
  return users
}

function deleteUser(id){
  // Llamamos al metodo que elminia un registro
  return Model.deleteOne(({
    _id: id
  }))
}



module.exports = {
  add: addUser,
  list: getUsers,
  remove: deleteUser,
}