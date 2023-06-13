const express = require('express');
const router = express.Router();
const controller = require('../controllers/consulta');

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.delete('/', controller.deleteAll);
router.get('/:id', controller.retrieveOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
