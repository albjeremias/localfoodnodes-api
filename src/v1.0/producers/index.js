import express from 'express';
import producers from './model';

var router = express.Router();

/**
 * @api {get} /producers/count Number of producers
 * @apiName Count
 * @apiGroup Producers
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} data Number of nodes.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "241"
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
  producers.count()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(404).send(error);
  });
});

export default router;