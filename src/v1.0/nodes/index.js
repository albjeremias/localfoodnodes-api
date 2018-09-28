import express from 'express';
import nodes from './model';

var router = express.Router();

/**
 * @api {get} /nodes/count Number of nodes
 * @apiName Count
 * @apiGroup Nodes
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} data Number of nodes.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "78"
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
  nodes.count()
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

/**
 * @api {get} /nodes/:nodeId/amount Order amount for a node
 * @apiName Order amount for a node
 * @apiGroup Nodes
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} nodeId The nodes id
 * @apiParam {String} currency Currency code to convert amount
 *
 * @apiSuccess {Object} data Number of nodes.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "432.0038"
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
router.get(['/:nodeId/amount', '/amount'], (req, res) => {
  nodes.amountPerNode(req.params.nodeId, req.query)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

/**
 * @api {get} /nodes/:nodeId/count Order count for a node
 * @apiName Order count for a node
 * @apiGroup Nodes
 * @apiVersion 1.0.0
 *
 * @apiParam {Int} nodeId The nodes id
 * @apiParam {String} currency Currency code to convert amount
 *
 * @apiSuccess {Object} data Number of nodes.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "data": "122"
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
router.get(['/:nodeId/count', '/amount'], (req, res) => {
  nodes.countPerNode(req.params.nodeId)
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

export default router;