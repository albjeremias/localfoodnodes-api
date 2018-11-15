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

  /**
   * Get node(s) data
   */
  data(id = null) {
    let query = 'SELECT * FROM nodes_generated';

    if (id) {
      query += ' where node_id = ' + id;
    }

    return db.query(query)
    .then(results => {
      for (let index in results.data) {
        results.data[index].data = JSON.parse(results.data[index].data);
      }

      return {
        data: results.data
      }
    });
  },
}
