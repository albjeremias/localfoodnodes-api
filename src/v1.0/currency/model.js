import db from 'db';
import _ from 'lodash';

export default {
  /**
   * Get rates
   */
  rates() {
    return new Promise(function(resolve, reject) {
      db.query('SELECT currency, rate FROM currencies', (error, results) => {
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

        let data = {}
        for (let index in results) {
          data[results[index].currency] = results[index].rate;
        };

        return resolve({data: data});
      });
    });
  },

  /**
   * Get rate
   */
  rate(currencyCode) {
    return new Promise(function(resolve, reject) {
      db.query('SELECT currency, rate FROM currencies WHERE currency = ?', [currencyCode], (error, results) => {
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

        return resolve({
          data: results[0].rate
        });
      });
    });
  },
}
