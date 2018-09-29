import express from 'express';
import orders from './model';

var router = express.Router();

/**
 * @api {get} /orders/count 3. Number of orders
 * @apiName Total number of orders
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiDescription Get the total number of orders.
 *
 * @apiSuccess {Array} data Total order product count.
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
 * @api {get} /orders/count/date 4. Number of ordersper date
 * @apiName Total number of orders per date
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiDescription Get the total number of orders grouped per date.
 *
 * @apiSuccess {Array} data Total order product count grouped by date.
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
 * @api {get} /orders/amount 1. Order amount
 * @apiName Total order amount
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiDescription Get the total order amount.
 *
 * @apiParam {String} currency Currency code to convert amount
 *
 * @apiSuccess {Int} data Amount in EUR if no other currency is specified.
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
 * @api {get} /orders/amount/date 2. Order amount per date
 * @apiName Order amount per date
 * @apiGroup Orders
 * @apiVersion 1.0.0
 * @apiDescription Get the total order amount grouped by date.
 *
 * @apiSuccess {Array} data Amount in EUR if no other currency is specified, grouped by date.
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
  orders.amountPerDate(req.query)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

export default router;