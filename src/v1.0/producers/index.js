import express from 'express';
import producers from './model';

var router = express.Router();

/**
 * @api {get} /producers/count Get producers count
 * @apiGroup Producers
 * @apiVersion 1.0.0
 * @apiDescription Get the number of producers registered on localfoodnodes.org.
 *
 * @apiSuccess {Object} data Number of producers.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "241"
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
  producers.count()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

export default router;