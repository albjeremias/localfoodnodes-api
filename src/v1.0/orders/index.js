import express from 'express';
import orders from './model';

var router = express.Router();

/**
 * @api {get} /orders/count Get orders count
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiDescription Get the total number of orders.
 *
 * @apiSuccess {Array} data Total order count.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "3248"
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
router.get('/count', (req, res) => {
  orders.count()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /orders/items Get order items count
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiDescription Get the total number of order items.
 *
 * @apiSuccess {Array} data Total order item count.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "3248"
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
router.get('/items', (req, res) => {
  orders.items()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /orders/products Get ordered products count
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiDescription Get the number of unique products ordered.
 *
 * @apiSuccess {Array} data Number of unique products ordered.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "3248"
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
router.get('/products', (req, res) => {
  orders.products()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /orders/count/date Get orders count per date
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiDescription Get the total number of orders grouped per date.
 *
 * @apiSuccess {Array} data Product count grouped by date.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": {
 *     "2017-05-25": 12,
 *     "2017-05-26": 37,
 *     "2017-05-27": 16,
 *     "2017-05-28": 21,
 *     ...
 *   }
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
router.get('/count/date', (req, res) => {
  orders.countPerDate()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /orders/amount Get orders amount
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiDescription Get the total order amount.
 *
 * @apiParam {String} currency Currency code
 *
 * @apiSuccess {Int} data Amount in EUR or other currency if specified.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "32354.00888051546"
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
router.get('/amount', (req, res) => {
  orders.amount(req.query)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /orders/amount/date Get orders amount per date
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiDescription Get the total order amount grouped by date.
 *
 * @apiSuccess {Array} data Order amount grouped by date
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": {
 *     "2017-05-25": 12,
 *     "2017-05-26": 37,
 *     "2017-05-27": 16,
 *     "2017-05-28": 21,
 *     ...
 *   }
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
router.get('/amount/date', (req, res) => {
  orders.amountPerDate(req.query.currency)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

export default router;