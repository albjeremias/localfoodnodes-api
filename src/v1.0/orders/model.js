import db from 'db';
import currencyConverter from 'currency-converter';

export default {
  /**
   * Get total number of orders
   */
  count() {
    return new Promise(function(resolve, reject) {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['orders_count'], (error, results, fields) => {
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
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['orders_count_per_date'], (error, results, fields) => {
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
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['orders_amount'], (error, results, fields) => {
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
  amountPerDate(query) {
    return new Promise(function(resolve, reject) {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['orders_amount_per_date'], (error, results, fields) => {
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

        // Todo: loop and convert currency?

        let data = {
          data: JSON.parse(results[0].data)
        };

        // Convert to currency
        // if (query.currency) {
        //   currencyConverter.convert(amount, query.currency)
        //   .then(amount => {
        //     return resolve({
        //       data: amount
        //     })
        //   });
        // } else {
        //   return resolve({
        //     data: amount
        //   });
        // }

        return resolve(data);
      });
    });
  }
}
