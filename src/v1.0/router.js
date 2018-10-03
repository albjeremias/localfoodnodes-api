import express from 'express';

import currency from './currency';
import delivery from './delivery';
import node from './node';
import nodes from './nodes';
import orders from './orders';
import producers from './producers';
import users from './users';

var router = express.Router();

router.use('/currency', currency);
router.use('/delivery/:nodeId/:date', delivery);
router.use('/node/:nodeId', node);
router.use('/nodes', nodes);
router.use('/orders', orders);
router.use('/producers', producers);
router.use('/users', users);

export default router;