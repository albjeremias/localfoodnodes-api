import db from 'db';;
import currencyConverter from 'currency-converter';

export default {
  /**
   * Get number of users
   */
  count() {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['user_count']);
  },

  /**
   * Get number of users
   */
  members() {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['user_members_count']);
  },

  /**
   * Get average membership amount
   */
  averageAmount(currencyCode, filtered) {
    let key = filtered === undefined ? 'user_average_amount_filtered' : 'user_average_amount';

    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', [key])
    .then(results => {
      return currencyConverter.convert(results.data, currencyCode)
      .then(data => {
        return {
          data: data
        }
      });
    })
  },
}
