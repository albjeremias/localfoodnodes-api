import db from 'db';
import currencyConverter from 'currency-converter';

export default {
  /**
   * Get number of nodes
   */
  count() {
    return new Promise(function(resolve, reject) {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['nodes_count'], (error, results, fields) => {
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
   * Order amount for a specific node
   */
  amountPerNode(nodeId, query) {
    return new Promise(function(resolve, reject) {

      if (!nodeId) {
        return reject({
          error: {
            message: 'Missing parameter.'
          }
        });
      }

      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['orders_amount_per_node'], (error, results, fields) => {
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

        if (!results[nodeId]) {
          return reject({
            error: {
              message: 'No data for node.'
            }
          });
        }

        let amount = results[nodeId]['amount'];

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
  }, // End amount per node

  /**
   * Order count for a specific node
   */
  countPerNode(nodeId) {
    return new Promise(function(resolve, reject) {

      if (!nodeId) {
        return reject({
          error: {
            message: 'Missing parameter.'
          }
        });
      }

      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['orders_count_per_node'], (error, results, fields) => {
        if (error) {
          return reject(db.formatJsonError(error));
        }

        console.log(results);

        if (!results || results.length < 1) {
          return reject({
            error: {
              message: 'No data.'
            }
          });
        }

        results = JSON.parse(results[0].data);

        if (!results[nodeId]) {
          return reject({
            error: {
              message: 'No data for node.'
            }
          });
        }

        return resolve({
          data: results[nodeId]
        });
      });
    });
  }, // End count per node
}
