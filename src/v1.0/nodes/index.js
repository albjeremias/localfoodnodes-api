import express from 'express';
import nodes from './model';

var router = express.Router();

/**
 * @api {get} /nodes/count Count
 * @apiName Count
 * @apiGroup Nodes
 * @apiVersion 1.0.0
 * @apiDescription Get the total number of nodes registered on localfoodnodes.org.
 *
 * @apiSuccess {Object} data Number of nodes.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "78"
 * }
 *
 * @apiError (Error 500) {Object} error Object containing error message.
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
  nodes.count()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

export default router;