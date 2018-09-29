Run as root
pm2 start index.js --interpreter ./node_modules/babel-cli/bin/babel-node.js --watch

Endpoints
1. Nodes
  1.1 Number of nodes
  # 1.2 Nodes (:nodeId)
  1.3 Total order amount per node (:nodeId, :currency)
  1.4 Total number of products ordered per node (:nodeId)
  1.  Number of members
  1.5 Total number of unique customers per node (:nodeId)
  # Search?
2. Orders
  2.1 Total order amount (:currency)
  2.2 Total order amount per date (:currency)
  2.3 Total number or products ordered
  2.4 Total number or products ordered per date
3. Producers
  3.1 Number of producers
  # 3.2 Producers (:producerId)
  # Search?
4. Users
  4.1 Number of users
  # 4.2 Users (:userId)
  # Search?
