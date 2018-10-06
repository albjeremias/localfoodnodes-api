import db from 'db';;

export default {
  /**
   * Get number of nodes
   */
  count() {
    return db.query('SELECT data FROM statistics WHERE statistics.key = ?', ['node_count']);
  },

  /**
   * Get node names
   */
  names() {
    return db.query('SELECT id, name FROM nodes')
    .then(results => {
      let data = {};

      for (let nodeId in results.data) {
        let node = results.data[nodeId];
        data[node.id] = node.name;
      }

      return {
        data: data
      }
    });
  },
}
