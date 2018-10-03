import express from 'express';
import currency from './model';

var router = express.Router();

/**
 * @api {get} /currency/rates Currency rates
 * @apiGroup Currency
 * @apiVersion 1.0.0
 * @apiDescription Get all currencies and rates
 *
 * @apiSuccess {Object} data List of all currency rates
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "2817"
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
router.get('/rates', (req, res) => {
  currency.rates()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /currency/rate/:currencyCode Currency rate
 * @apiGroup Currency
 * @apiVersion 1.0.0
 * @apiDescription Get specific currency rate compared to EUR
 *
 * @apiSuccess {Object} data Currency rate
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "1.04"
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
router.get('/rate/:currencyCode', (req, res) => {
  currency.rate(req.params.currencyCode)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

export default router;