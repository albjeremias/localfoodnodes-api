import db from 'db';;
import currencyConverter from 'currency-converter';

export default {
  /**
   * Order amount for a specific node
   */
  amount(nodeId, currency) {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_amount_per_node'], true)
    .then(results => {
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
        return currencyConverter.convert(amount, currency)
        .then(amount => {
          return {
            data: amount
          };
        });
      } else {
        return {
          data: amount
        };
      }
    });
  }, // End amount per node

  /**
   * Order count for a node
   */
  orders(nodeId) {
    return this.query('order_count_per_node', [nodeId]);
  },

  /**
   * Number of members for a node
   */
  members(nodeId) {
    return this.query('node_members', [nodeId]);
  },

  /**
   * Customers per node
   */
  customers(nodeId) {
    return this.query('node_customers', [nodeId]);
  },

  /**
   * Producers per node
   */
  producers(nodeId) {
    return this.query('node_producers', [nodeId]);
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
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', [key], true)
    .then(results => {
      results = JSON.parse(results[0].data);

      if (!results[nodeId]) {
        throw 'No data for provided node id.';
      }

      return {
        data: results[nodeId]
      };
    });
  }
}
