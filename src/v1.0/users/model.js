import db from 'db';

export default {
  /**
   * Get number of users
   */
  count() {
    return new Promise(function(resolve, reject) {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['user_count'], (error, results) => {
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

        let data = results[0];
        return resolve(data);
      });
    });
  },

  /**
   * Get number of users
   */
  members() {
    return new Promise(function(resolve, reject) {
      db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['user_members_count'], (error, results) => {
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

        let data = results[0];
        return resolve(data);
      });
    });
  },

  /**
   * Get average membership amount
   */
  members() {
    return new Promise(function(resolve, reject) {
      return resolve({
        data: 160
      });
    });
  },
}
