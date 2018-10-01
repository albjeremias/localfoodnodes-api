import express from 'express';
import delivery from './model';

var router = express.Router({ mergeParams: true });

/**
 * @api {get} /delivery/:nodeId/:date/amount Amount
 * @apiName Total order amount
 * @apiGroup Delivery
 * @apiVersion 1.0.0
 * @apiDescription Get the total amount for the products sold for the specific delivery.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
 *
 * @apiSuccess {Object} data Amount.
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
router.get(['/amount'], (req, res) => {
  delivery.amount(req.params.nodeId, req.params.date, req.query.currency)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /delivery/:nodeId/:date/orders Orders
 * @apiName Number of orders
 * @apiGroup Delivery
 * @apiVersion 1.0.0
 * @apiDescription Get the number of orders for the specific delivery.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
 *
 * @apiSuccess {Object} data Amount.
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
router.get(['/orders'], (req, res) => {
  delivery.orders(req.params.nodeId, req.params.date)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /delivery/:nodeId/:date/customers Customers
 * @apiName Total number of customers per node (and date)
 * @apiGroup Delivery
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
router.get(['/customers'], (req, res) => {
  delivery.customers(req.params.nodeId, req.params.date)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /delivery/:nodeId/:date/producers Producers
 * @apiName Number of producers for a specific delivery
 * @apiGroup Delivery
 * @apiVersion 1.0.0
 * @apiDescription Get the number of producers for a specific delivery.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
 *
 * @apiSuccess {Object} data Number of producers for the delivery.
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
  delivery.producers(req.params.nodeId, req.params.date)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /delivery/:nodeId/:date/products Products
 * @apiName Number of sold products per delivery
 * @apiGroup Delivery
 * @apiVersion 1.0.0
 * @apiDescription Get the number of sold products for a delivery.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
 *
 * @apiSuccess {Object} data Number of sold product for delivery.
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
  delivery.products(req.params.nodeId, req.params.date)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

export default router;