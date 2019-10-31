const config = {
  dbUrl: process.env.DB_URL || 'mongodb+srv://db_user_platzi:Edv63mwZKm3XFewH@cluster0-hrtjg.mongodb.net/platzinode_db?retryWrites=true&w=majority',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
  filesRoute: process.env.FILES || '/files',
}

module.exports = config