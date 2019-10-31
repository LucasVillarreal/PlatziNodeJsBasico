const db = require('mongoose')

// Datos para conectar con BD
db.Promise = global.Promise
// 'mongodb+srv://db_user_platzi:Edv63mwZKm3XFewH@cluster0-hrtjg.mongodb.net/platzinode_db?retryWrites=true&w=majority'
async function connect(url) {
  await db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('[db] Conectada con éxito')
}

module.exports = connect
  
