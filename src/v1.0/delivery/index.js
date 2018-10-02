import express from 'express';
import delivery from './model';

var router = express.Router({ mergeParams: true });

/**
 * @api {get} /delivery/:nodeId/:date/amount Get orders amount
 * @apiGroup Delivery
 * @apiVersion 1.0.0
 * @apiDescription Get the amount for all of the products sold on a specific delivery date.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
 *
 * @apiSuccess {Object} data Amount in EUR or the provided currency.
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
 * @api {get} /delivery/:nodeId/:date/orders Get orders count
 * @apiGroup Delivery
 * @apiVersion 1.0.0
 * @apiDescription Get the number of orders for a specific delivery date.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
 *
 * @apiSuccess {Object} data Number of orders.
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
 * @api {get} /delivery/:nodeId/:date/customers Get customers count
 * @apiGroup Delivery
 * @apiVersion 1.0.0
 * @apiDescription Get the number of ordering customers for a specific delivery date.
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
 * @api {get} /delivery/:nodeId/:date/producers Get producers count
 * @apiGroup Delivery
 * @apiVersion 1.0.0
 * @apiDescription Get the number of producers for a specific delivery date.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
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
 * @api {get} /delivery/:nodeId/:date/products Get products count
 * @apiGroup Delivery
 * @apiVersion 1.0.0
 * @apiDescription Get the number of sold products for a specific delivery date.
 *
 * @apiParam {Int} nodeId The node id
 * @apiParam {Int} date Date formatted as yyyy-mm-dd.
 *
 * @apiSuccess {Object} data Number of sold product.
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