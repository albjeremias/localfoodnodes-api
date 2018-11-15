import db from 'db';

export default {
  /**
   * Get rates
   */
  rates() {
    return db.query('SELECT currency, rate FROM currencies')
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
  labels() {
    return db.query('SELECT currency, label FROM currencies')
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
