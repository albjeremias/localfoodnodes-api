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
   * Get rate
   */
  rate(currencyCode) {
    return db.query('SELECT currency, rate FROM currencies WHERE currency = ?', [currencyCode])
    .then(results => {
      return {
        data: results.rate
      };
    });
  },
}
