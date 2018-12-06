import express from 'express';
import currency from './model';
import currencyConverter from 'currency-converter';

var router = express.Router();

/**
 * @api {get} /currency/rates Currency rates
 * @apiGroup Currency
 * @apiVersion 1.0.0
 * @apiDescription Get all currency rates
 *
 * @apiParam {String} enabled Only get currency rates supported by the platform.
 *
 * @apiSuccess {Object} data Currency rates
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
  currency.rates(req.query.enabled)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /currency/labels Currency labels
 * @apiGroup Currency
 * @apiVersion 1.0.0
 * @apiDescription Get all currency labels
 *
 * @apiParam {String} enabled Only get currency labels supported by the platform.
 *
 * @apiSuccess {Object} data Currency labels
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": {
 *     "AED": "United Arab Emirates Dirham",
 *     "AFN": "Afghan Afghani",
 *     "ALL": "Albanian Lek",
 *     "AMD": "Armenian Dram",
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
router.get('/labels', (req, res) => {
  currency.labels(req.query.enabled)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /currency/rate/:currency Currency rate
 * @apiGroup Currency
 * @apiVersion 1.0.0
 * @apiDescription Get specific currency rate. EUR is base currency.
 *
 * @apiParam {String} currency Currency code in ISO 4217 format.
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
router.get('/rate/:currency', (req, res) => {
  currency.rate(req.params.currency)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /currency/convert/:amount/:currency Convert amount
 * @apiGroup Currency
 * @apiVersion 1.0.0
 * @apiDescription Convert amount to specified currency
 *
 * @apiParam {Int} amount Amount to convert.
 * @apiParam {String} currency Currency code in ISO 4217 format to convert to.
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
router.get('/convert/:amount/:currency', (req, res) => {
  currencyConverter.convert(req.params.amount, req.params.currency)
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