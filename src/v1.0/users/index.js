import express from 'express';
import users from './model';

var router = express.Router();

/**
 * @api {get} /users/count Count
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Get the number of users registered on localfoodnodes.org.
 *
 * @apiSuccess {Object} data Number of users.
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
router.get('/count', (req, res) => {
  users.count()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /users/count/date Count per date
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Get the number of users registered per date.
 *
 * @apiSuccess {Object} data Number of users per date.
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
router.get('/count/date', (req, res) => {
  users.countPerDate()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /users/members Members count
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Get the number of paying users on localfoodnodes.org.
 *
 * @apiSuccess {Object} data Number of members.
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
router.get('/members', (req, res) => {
  users.members()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /users/amount/average Average membership amount
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Get the average membership amount.
 *
 * @apiParam {String} currency Currency code in ISO 4217 format to convert to.
 * @apiParam {String} filtered Exclude all membership payments below minimum charge.
 *
 * @apiSuccess {Object} data Amount.
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
router.get('/amount/average', (req, res) => {
  users.averageAmount(req.query.currency, req.query.filtered)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

export default router;