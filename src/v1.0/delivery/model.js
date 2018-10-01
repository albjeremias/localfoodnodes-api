import db from 'db';
import currencyConverter from 'currency-converter';

export default {
  /**
   * Amount
   */
  amount(nodeId, date, currency) {
    return this.query('delivery_order_amount', nodeId, date, currency);
  },

  /**
   * Orders
   */
  orders(nodeId, date) {
    return this.query('delivery_order_count', nodeId, date);
  },

  /**
   * Customers
   */
  customers(nodeId, date) {
    return this.query('delivery_customers', nodeId, date);
  },

  /**
   * Customers
   */
  producers(nodeId, date) {
    return this.query('delivery_producers', nodeId, date);
  },

  /**
   * Products
   */
  products(nodeId, date) {
    return this.query('delivery_products', nodeId, date);
  },

  /**
   * Entity
   */
  query(key, nodeId, date, currency) {
    return new Promise(function(resolve, reject) {
      if (!date) {
        return reject({
          error: {
            message: 'Missing date parameter.'
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

        if (!results[nodeId][date]) {
          return reject({
            error: {
              message: 'No data for provided date.'
            }
          });
        }

        results = results[nodeId][date];

        // Convert to currency
        if (currency) {
          currencyConverter.convert(results, currency)
          .then(amount => {
            return resolve({
              data: amount
            })
          });
        } else {
          return resolve({
            data: results
          });
        }
      });
    });
  },
}