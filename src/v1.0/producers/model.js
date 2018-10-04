import db from 'db';;

export default {
  /**
   * Get number of producers
   */
  count() {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['producer_count']);
  },
}
