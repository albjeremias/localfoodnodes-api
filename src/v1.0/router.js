import express from 'express';
import users from './users';
import producers from './producers';
import nodes from './nodes';
import orders from './orders';

var router = express.Router();

router.use('/users', users);
router.use('/producers', producers);
router.use('/nodes', nodes);
router.use('/orders', orders);

export default router;