const express = require('express');
const router = express.Router();

const usuarioRouters = require('./usuarioRouters.js');

router.use('/usuarios', usuarioRouters);

module.exports = router;