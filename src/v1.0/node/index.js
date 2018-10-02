import express from 'express';
import node from './model';

var router = express.Router({ mergeParams: true });

/**
 * @api {get} /node/:nodeId/amount Get orders amount
 * @apiGroup Node
 * @apiVersion 1.0.0
 * @apiDescription Get the total amount for all orders placed on a node.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {String} currency Currency code
 *
 * @apiSuccess {Object} data Amount in EUR or other specified currency.
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
router.get(['/amount'], (req, res) => {
  node.amount(req.params.nodeId, req.query.currency)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /node/:nodeId/orders Get ordered products count
 * @apiGroup Node
 * @apiVersion 1.0.0
 * @apiDescription Get the total number of products ordered for a node.
 *
 * @apiParam {Int} nodeId The node id
 *
 * @apiSuccess {Object} data Number of orders.
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
router.get(['/orders'], (req, res) => {
  node.orders(req.params.nodeId)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /node/:nodeId/members Get members count
 * @apiGroup Node
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
router.get(['/members'], (req, res) => {
  node.members(req.params.nodeId)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /node/:nodeId/customers Get customers count
 * @apiGroup Node
 * @apiVersion 1.0.0
 * @apiDescription Get the number of ordering customers on a node.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
 *
 * @apiSuccess {Object} data Number of customers.
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
router.get(['/customers'], (req, res) => {
  node.customers(req.params.nodeId)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /node/:nodeId/producers Get producers count
 * @apiGroup Node
 * @apiVersion 1.0.0
 * @apiDescription Get the number of producers for a node.
 *
 * @apiParam {Int} nodeId The node id
 *
 * @apiSuccess {Object} data Number of producers.
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
router.get(['/producers'], (req, res) => {
  node.producers(req.params.nodeId)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /node/:nodeId/products Get products count
 * @apiGroup Node
 * @apiVersion 1.0.0
 * @apiDescription Get the number of sold products on a node.
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
router.get(['/products'], (req, res) => {
  node.products(req.params.nodeId)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

export default router;