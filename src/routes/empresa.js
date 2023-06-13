const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresa');

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.put('/:id', controller.update);

module.exports = router;
