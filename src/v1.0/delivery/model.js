import db from 'db';;
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
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', [key], true)
    .then(results => {
      results = JSON.parse(results[0].data);

      if (!results[nodeId]) {
        throw 'No data for provided node id.';
      }

      if (!results[nodeId][date]) {
        throw 'No data for provided date.';
      }

      results = results[nodeId][date];

      // Convert to currency
      if (currency) {
        return currencyConverter.convert(results, currency)
        .then(amount => {
          return {
            data: amount
          };
        });
      } else {
        return {
          data: results
        };
      }
    });
  },
}