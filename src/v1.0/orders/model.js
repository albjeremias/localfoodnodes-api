import db from 'db';

export default {
  /**
   * Get total number of orders
   */
  count() {
    return new Promise(function(resolve, reject) {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['orders_count_total'], (error, results, fields) => {
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
  amount() {
    return new Promise(function(resolve, reject) {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['orders_amount_total'], (error, results, fields) => {
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
   * Get order amount per date in euro
   */
  amountPerDate() {
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

        let data = {
          data: JSON.parse(results[0].data)
        };

        return resolve(data);
      });
    });
  }
}
