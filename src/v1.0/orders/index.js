import express from 'express';
import orders from './model';

var router = express.Router();

/**
 * @api {get} /orders/count 3. Order product count
 * @apiName Order product count
 * @apiGroup Orders
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} data Total order product count.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "3248"
 * }
 *
 * @apiError (Error 500) {Object} ServerError
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 ServerError
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
 * @api {get} /orders/count/date 4. Order product count per date
 * @apiName Order product count per date
 * @apiGroup Orders
 * @apiVersion 1.0.0
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
 * @apiError (Error 500) {Object} ServerError
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 ServerError
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
 * @apiName Order amount
 * @apiGroup Orders
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Int} data Total order amount in euro.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "32354.00888051546"
 * }
 *
 * @apiError (Error 500) {Object} ServerError
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 ServerError
 * {
 *   "error": {
 *     message: "A message describing the error."
 *   }
 * }
 */
router.get('/amount', (req, res) => {
  orders.amount()
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
 *
 * @apiSuccess {Array} data Order amount in euro grouped by date.
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
 * @apiError (Error 500) {Object} ServerError
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 ServerError
 * {
 *   "error": {
 *     message: "A message describing the error."
 *   }
 * }
 */
router.get('/amount/date', (req, res) => {
  orders.amountPerDate()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

export default router;