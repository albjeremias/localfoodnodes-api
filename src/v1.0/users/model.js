import db from 'db';

export default {
  /**
   * Get number of users
   */
  count() {
    return new Promise(function(resolve, reject) {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['users_count'], (error, results, fields) => {
        if (error) {
          reject(error);
        }

        if (results.length < 1) {
          return reject('Fel');
        }

        let data = results[0];
        return resolve(data);
      });
    });
  },
}
