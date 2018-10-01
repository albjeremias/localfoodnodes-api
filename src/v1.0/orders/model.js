import db from 'db';
import currencyConverter from 'currency-converter';

export default {
  /**
   * Get total number of orders
   */
  count() {
    return new Promise(function(resolve, reject) {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_count'], (error, results, fields) => {
        if (error) {
          return reject(db.formatJsonError(error));
        }

        if (!results || results.length < 1) {
          return reject({
            error: {
              message: 'No data.'
            }
          });
        }

        let data = results[0];
        return resolve(data);
      });
    });
  },

  /**
   * Get order count per date
   */
  countPerDate() {
    return new Promise(function(resolve, reject) {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_count_per_date'], (error, results, fields) => {
        if (error) {
          return reject(db.formatJsonError(error));
        }

        if (!results || results.length < 1) {
          return reject({
            error: {
              message: 'No data.'
            }
          });
        }

        let data = {
          data: JSON.parse(results[0].data)
        };

        return resolve(data);
      });
    });
  },

  /**
   * Get order amount total in euro
   */
  amount(query) {
    return new Promise(function(resolve, reject) {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_amount'], (error, results, fields) => {
        if (error) {
          return reject(db.formatJsonError(error));
        }

        if (!results || results.length < 1) {
          return reject({
            error: {
              message: 'No data.'
            }
          });
        }

        let amount = results[0].data;

        // Convert to currency
        if (query.currency) {
          currencyConverter.convert(amount, query.currency)
          .then(amount => {
            return resolve({
              data: amount
            })
          });
        } else {
          return resolve({
            data: amount
          });
        }
      });
    });
  },

  /**
   * Get order amount per date in euro
   */
  amountPerDate(currency) {
    return new Promise((resolve, reject) => {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_amount_per_date'], (error, results, fields) => {
        if (error) {
          return reject(db.formatJsonError(error));
        }

        if (!results || results.length < 1) {
          return reject({
            error: {
              message: 'No data.'
            }
          });
        }

        results = JSON.parse(results[0].data);

        // Convert to currency
        if (currency) {
          // Loop and convert amount for all dates
          let promises = [];
          for (const date in results) {
            if (!results[date] == 0) {
              let promise = currencyConverter.convert(results[date], currency)
              .then(amount => {
                return {
                  date: date,
                  amount: amount
                }
              });

              promises.push(promise);
            } else {
              promises.push(Promise.resolve({
                date: date,
                amount: 0
              }));
            }
          }

          Promise.all(promises)
          .then((results) => {
            let obj = {};
            for (const key in results) {
              obj[results[key]['date']] = results[key]['amount'];
            }

            return resolve({
              data: obj
            });
          })
          .catch(error => {
              console.error(error)
          });
        } else {
          return resolve({
            data: results
          });
        }

        // let data = {
        //   data: JSON.parse(results[0].data)
        // };


        // return resolve(data);
      });
    });
  }
}
