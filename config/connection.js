const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thoughsDB';
//I am aware 'thoughts' is spelt wrong, please just roll with it. The data was already created

connect(connectionString);

module.exports = connection;
