import express from 'express';
import nodes from './model';

var router = express.Router();

/**
 * @api {get} /nodes/count 1. Number of nodes
 * @apiName Count
 * @apiGroup Nodes
 * @apiVersion 1.0.0
 * @apiDescription Get the total number of nodes registered on localfoodnodes.org.
 *
 * @apiSuccess {Object} data Number of nodes.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "78"
 * }
 *
 * @apiError (Error 500) {Object} error Object containing error message.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": {
 *     message: "A message describing the error."
 *   }
 * }
 */
router.get('/count', (req, res) => {
  nodes.count()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

/**
 * @api {get} /nodes/:nodeId/amount 4. Total order amount
 * @apiName Total order amount per node
 * @apiGroup Nodes
 * @apiVersion 1.0.0
 * @apiDescription Get the total amount (EUR) for all orders placed on the specified node.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {String} currency Currency code to convert amount
 *
 * @apiSuccess {Object} data Amount in EUR if no other currency is specified.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "432.0038"
 * }
 *
 * @apiError {Object} error Object containing error message.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": {
 *     message: "A message describing the error."
 *   }
 * }
 */
router.get(['/:nodeId/amount'], (req, res) => {
  nodes.amountPerNode(req.params.nodeId, req.query)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /nodes/:nodeId/orders 3. Number or products ordered
 * @apiName Total number or products ordered per node
 * @apiGroup Nodes
 * @apiVersion 1.0.0
 * @apiDescription Get the total number of products ordered for the specified node.
 *
 * @apiParam {Int} nodeId The node id
 *
 * @apiSuccess {Object} data Number of nodes.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "122"
 * }
 *
 * @apiError {Object} error Object containing error message.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": {
 *     message: "A message describing the error."
 *   }
 * }
 */
router.get(['/:nodeId/orders'], (req, res) => {
  nodes.ordersPerNode(req.params.nodeId)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /nodes/:nodeId/members 2. Number of members
 * @apiName Number of members per node
 * @apiGroup Nodes
 * @apiVersion 1.0.0
 * @apiDescription Get the number of users that's currently a member of a node.
 *
 * @apiParam {Int} nodeId The node id
 *
 * @apiSuccess {Object} data Number of members.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "122"
 * }
 *
 * @apiError {Object} error Object containing error message.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": {
 *     message: "A message describing the error."
 *   }
 * }
 */
router.get(['/:nodeId/members'], (req, res) => {
  nodes.membersPerNode(req.params.nodeId)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /nodes/:nodeId/customers 5. Number of customers
 * @apiName Total number of customers per node (and date)
 * @apiGroup Nodes
 * @apiVersion 1.0.0
 * @apiDescription Get the total number of ordering customers for a node. If you provide a date you'll get the number of customers who placed orders for the specified date.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
 *
 * @apiSuccess {Object} data Number of customers per node (and date).
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "45"
 * }
 *
 * @apiError {Object} error Object containing error message.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": {
 *     message: "A message describing the error."
 *   }
 * }
 */
router.get(['/:nodeId/customers'], (req, res) => {
  // Choose model depending on query
  let model = function(req) {
    if (req.query.date) {
      return nodes.customersPerNodeAndDate(req.params.nodeId, req.query.date)
    } else {
      return nodes.customersPerNode(req.params.nodeId)
    }
  }

  model(req)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /nodes/:nodeId/producers 6. Number of producers
 * @apiName Number of producers per node (and date)
 * @apiGroup Nodes
 * @apiVersion 1.0.0
 * @apiDescription Get the number of producers for a node. If you provide a date you'll get the number of producers with orders to delivery for the specified date.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
 *
 * @apiSuccess {Object} data Number of producers per node (and date).
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "45"
 * }
 *
 * @apiError {Object} error Object containing error message.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": {
 *     message: "A message describing the error."
 *   }
 * }
 */
router.get(['/:nodeId/producers'], (req, res) => {
  // Choose model depending on query
  let model = function(req) {
    if (req.query.date) {
      return nodes.producersPerNodeAndDate(req.params.nodeId, req.query.date)
    } else {
      return nodes.producersPerNode(req.params.nodeId)
    }
  }

  model(req)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /nodes/:nodeId/products 7. Number of products
 * @apiName Number of sold products per node (and date)
 * @apiGroup Nodes
 * @apiVersion 1.0.0
 * @apiDescription Get the number of sold products for a node. If you provide a date you'll get the number of products sold on the specificed date.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
 *
 * @apiSuccess {Object} data Number of sold product for node (and date).
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "45"
 * }
 *
 * @apiError {Object} error Object containing error message.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": {
 *     message: "A message describing the error."
 *   }
 * }
 */
router.get(['/:nodeId/products'], (req, res) => {
  // Choose model depending on query
  let model = function(req) {
    if (req.query.date) {
      return nodes.productsPerNodeAndDate(req.params.nodeId, req.query.date)
    } else {
      return nodes.productsPerNode(req.params.nodeId)
    }
  }

  model(req)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

export default router;