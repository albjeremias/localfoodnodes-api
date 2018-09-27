import express from 'express';
import users from './model';

var router = express.Router();

/**
 * @api {get} /users/count Number of producers
 * @apiName Count
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} data Number of users.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "2817"
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
  users.count()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});


export default router;