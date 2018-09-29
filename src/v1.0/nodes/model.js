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
  ordersPerNode(nodeId) {
    return this.entityPerNode('orders_count_per_node', nodeId);
  },

  /**
   * Number of members for a specific node
   */
  membersPerNode(nodeId) {
    return this.entityPerNode('nodes_members_per_node', nodeId);
  },

  /**
   * Customers per node
   */
  customersPerNode(nodeId) {
    return this.entityPerNode('nodes_customers_per_node', nodeId);
  },

  /**
   * Customers per node and date
   */
  customersPerNodeAndDate(nodeId, date) {
    return this.entityPerNodeAndDate('nodes_customers_per_node_and_date', nodeId, date);
  },

  /**
   * Producers per node
   */
  producersPerNode(nodeId) {
    return this.entityPerNode('nodes_producers_per_node', nodeId);
  },

  /**
   * Customers per node and date
   */
  producersPerNodeAndDate(nodeId, date) {
    return this.entityPerNodeAndDate('nodes_producers_per_node_and_date', nodeId, date);
  },

  /**
   * Producers per node
   */
  productsPerNode(nodeId) {
    return this.entityPerNode('nodes_products_per_node', nodeId);
  },

  /**
   * Products per node and date
   */
  productsPerNodeAndDate(nodeId, date) {
    return this.entityPerNodeAndDate('nodes_products_per_node_and_date', nodeId, date);
  },

  /**
   * Entity per node
   */
  entityPerNode(key, nodeId) {
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

  /**
   * Entity per node and date
   */
  entityPerNodeAndDate(key, nodeId, date) {
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

        return resolve({
          data: results[nodeId][date]
        });
      });
    });
  },
}
