import db from 'db';

class CurrencyConverter {
  convert(amount, to, from = 'EUR') {
    return new Promise(function(resolve, reject) {
      return db.query('SELECT * FROM currencies', (error, results) => {
        if (!from || !to) {
          return reject('Missing currencies');
        }

        let fromRate = results.find((obj) => {
          return obj.currency.toLowerCase() == from.toLowerCase();
        }).rate;

        let toRate = results.find((obj) => {
          return obj.currency.toLowerCase() == to.toLowerCase();
        }).rate;

        let convertedAmount = amount / fromRate;

        if (to) {
          convertedAmount = convertedAmount * toRate;
        }

        return resolve(convertedAmount);
      });
    });
  }
}

module.exports = new CurrencyConverter();