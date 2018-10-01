import db from 'db';
import currencyConverter from 'currency-converter';

export default {
  /**
   * Order amount for a specific node
   */
  amount(nodeId, currency) {
    return new Promise(function(resolve, reject) {

      if (!nodeId) {
        return reject({
          error: {
            message: 'Missing parameter.'
          }
        });
      }

      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_amount_per_node'], (error, results, fields) => {
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
        if (currency) {
          currencyConverter.convert(amount, currency)
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
   * Order count for a node
   */
  orders(nodeId) {
    return this.query('order_count_per_node', nodeId);
  },

  /**
   * Number of members for a node
   */
  members(nodeId) {
    return this.query('node_members', nodeId);
  },

  /**
   * Customers per node
   */
  customers(nodeId) {
    return this.query('node_customers', nodeId);
  },

  /**
   * Producers per node
   */
  producers(nodeId) {
    return this.query('node_producers', nodeId);
  },

  /**
   * Producers per node
   */
  products(nodeId) {
    return this.query('node_products', nodeId);
  },


  /**
   * Entity per node
   */
  query(key, nodeId) {
    return new Promise(function(resolve, reject) {

      if (!nodeId) {
        return reject({
          error: {
            message: 'Missing parameter.'
          }
        });
      }

      db.query('SELECT data FROM statistics WHERE statistics.key = ?', [key], (error, results, fields) => {
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
              message: 'No data for provided node id.'
            }
          });
        }

        return resolve({
          data: results[nodeId]
        });
      });
    });
  },
}
