const store = require('./store')

function addNewChat(users){
  // en caso de no contener usuario/mensaje devolvemos un error
  if (!users || !Array.isArray(users)) {
    console.error('[chatsController]')
    return Promise.reject('Los datos son incorrectos')
  }

  const chat = {
    users: users,
  }
  return store.add(chat)
}

function listChats(userId){
  return store.list(userId)
}

module.exports = {
  addNewChat,
  listChats,
}