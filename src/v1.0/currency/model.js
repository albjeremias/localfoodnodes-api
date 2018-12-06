import db from 'db';

export default {
  /**
   * Get rates
   */
  rates(enabled) {
    let query = 'SELECT currency, rate FROM currencies';

    if (enabled) {
      query += ' WHERE enabled = 1';
    }

    console.log(query);

    return db.query(query)
    .then(results => {
      let formattedData = {}
      for (let index in results.data) {
        formattedData[results.data[index].currency] = results.data[index].rate;
      };

      return {
        data: formattedData
      };
    });
  },

  /**
   * Get labels
   */
  labels(enabled) {
    let query = 'SELECT currency, label FROM currencies';

    if (enabled) {
      query += ' WHERE enabled = 1';
    }

    return db.query(query)
    .then(results => {
      let formattedData = {}
      for (let index in results.data) {
        formattedData[results.data[index].currency] = results.data[index].label;
      };

      return {
        data: formattedData
      };
    });
  },

  /**
   * Get rate
   */
  rate(currency) {
    return db.query('SELECT currency, rate FROM currencies WHERE currency = ?', [currency])
    .then(results => {
      return {
        data: results.rate
      };
    });
  },
}
