const Model = require('./model')

function addNewChat(chat){
  const newChat = new Model(chat)
  return newChat.save()
}

function listChats(userId){
  return new Promise((resolve, reject) => {
    let filter = {}
    if (userId) {
      filter = {
        users: userId,
      }
    }

    Model.find(filter)
      .populate('users')
      .exec((error, populated) => {
        if(error){
          reject(error)
          return false
        }
        resolve(populated)
      })
  })
}

module.exports = {
  add: addNewChat,
  list: listChats,
}