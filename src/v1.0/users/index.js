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


export default router;