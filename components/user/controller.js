// Logica del controlador
const store = require('./store')

// Recibimos el usuario y el mensaje añadir en la BD
function addUser(name) {
  // en caso de no contener usuario/mensaje devolvemos un error
  if (!name) {
    console.error('[userController] No hay usuario o mensaje')
    return Promise.reject('Los datos son incorrectos')
  }
  // almacenamos los datos
  const user = {
    name,
    date: new Date()
  }
  // llamamos al metodo 'add' del componentne store pasandole los datos a almacenar
  return store.add(user)
}

function getUsers(filterUser){
  return new Promise((resolve, reject) =>{
    // Si hay, devolvemos el metodo 'list' del store (con o sin filtro)
    resolve(store.list(filterUser))
  })
}

function deleteUser(id){
  return new Promise((resolve, reject) => {
    // Si no hay ID devolvemos el error
    if (!id) {
      reject('Id inválido')
      return false
    }

    store.remove(id)
      .then(() => {
        resolve()
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports = {
  addUser,
  getUsers,
  deleteUser
}