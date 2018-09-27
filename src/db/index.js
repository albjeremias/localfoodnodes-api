import mysql from 'mysql';

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error('error connecting: ' + error.stack);
    return;
  }
});

connection.formatJsonError = function(error) {
  return {
    error: {
      code: error.code,
      errno: error.errno,
      message: error.sqlMessage,
    }
  };
};

module.exports = connection;