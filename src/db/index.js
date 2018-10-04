import mysql from 'mysql';

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect();

module.exports = {
  query(queryString, queryParams, ignoreFormatting) {
    let promise = new Promise(function(resolve, reject) {
      connection.query(queryString, queryParams, (error, results) => {
        if (error) {
          reject(error);
        }

        if (!results || results.length < 1) {
          return reject({
            error: {
              message: 'No data.'
            }
          });
        }

        if (ignoreFormatting) {
          return resolve(results);
        } else {
          if (results.length === 1) {
            return resolve(results[0]);
          } else {
            return resolve({
              data: results
            });
          }
        }
      });
    });

    // Default catch
    promise.catch(error => {
      console.error(error);
    });

    return promise;
  }
}
