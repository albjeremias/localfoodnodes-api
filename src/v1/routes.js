import express from 'express';
import orders from './models/orders';

var router = express.Router();

/**
 * @api {get} /orders/count Count of all orders
 * @apiName Count
 * @apiGroup Orders
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} data Order amount in euro grouped by dates.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": "3248"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
router.get('/orders/count', (req, res) => {
  orders.countTotal()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(404).send(error);
  });
});

/**
 * @api {get} /orders/count/date Count per date
 * @apiName Count per date
 * @apiGroup Orders
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} data Order amount in euro grouped by dates.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "2017-05-25": 12,
 *         "2017-05-26": 37,
 *         "2017-05-27": 16,
 *         "2017-05-28": 21,
 *       }
 *     }
 */
router.get('/orders/count/date', (req, res) => {
  orders.countPerDate()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(404).send(error);
  });
});

/**
 * @api {get} /orders/amount Total amount
 * @apiName Total amount
 * @apiGroup Orders
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Int} data Total order amount in euro.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": "32354.00888051546"
 *     }
 */
router.get('/orders/amount', (req, res) => {
  orders.amountTotal()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(404).send(error);
  });
});

/**
 * @api {get} /orders/amount/date Amount per date
 * @apiName Amount per date
 * @apiGroup Orders
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} data Order amount in euro grouped by dates.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "2017-05-25": 12,
 *         "2017-05-26": 37,
 *         "2017-05-27": 16,
 *         "2017-05-28": 21,
 *       }
 *     }
 */
router.get('/orders/amount/date', (req, res) => {
  orders.amountPerDate()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(404).send(error);
  });
});

export default router;