import db from 'db';;

export default {
  /**
   * Get number of nodes
   */
  count() {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['node_count']);
  },
}
