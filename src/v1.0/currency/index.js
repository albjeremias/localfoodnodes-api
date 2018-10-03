import express from 'express';
import currency from './model';
import currencyConverter from 'currency-converter';

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
 *   "data": {
 *     "AED": 4.268621,
 *     "AFN": 87.917027,
 *     "ALL": 126.562641,
 *     "AMD": 560.981322,
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

/**
 * @api {get} /currency/convert/:amount/:currencyCode Currency rate
 * @apiGroup Currency
 * @apiVersion 1.0.0
 * @apiDescription Convert amount to specified currency
 *
 * @apiSuccess {Object} data Converted amount.
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
router.get('/convert/:amount/:currencyCode', (req, res) => {
  currencyConverter.convert(req.params.amount, req.params.currencyCode)
  .then(convertedAmount => {
    res.send({
      data: convertedAmount
    });
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

export default router;