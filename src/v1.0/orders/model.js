import db from 'db';;
import currencyConverter from 'currency-converter';

export default {
  /**
   * Get total number of orders.
   */
  count() {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_count']);
  },

  /**
   * Get total number of order items.
   */
  items() {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_items_count']);
  },

  /**
   * Get total number of unique products.
   */
  products() {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_unique_items_count']);
  },

  /**
   * Get order count per date
   */
  countPerDate() {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_count_per_date'])
    .then(results => {
      return {
        data: JSON.parse(results.data)
      };
    });
  },

  /**
   * Get order amount total in euro
   */
  amount(query) {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_amount'], true)
    .then(results => {
      let amount = results[0].data;

      // Convert to currency
      if (query.currency) {
        currencyConverter.convert(amount, query.currency)
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
  },

  /**
   * Get order amount per date in euro
   */
  amountPerDate(currency) {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['order_amount_per_date'], true)
    .then(results => {
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

        return Promise.all(promises)
        .then((results) => {
          let obj = {};
          for (const key in results) {
            obj[results[key]['date']] = results[key]['amount'];
          }

          return {
            data: obj
          };
        });
      } else {
        return {
          data: results
        };
      }
    });
  }
}
