/**
 * Aquí declaramos las rutas y las enviamos a los .js que hay en esta misma carpeta!
 */

const router = require('express').Router();

router.use('/', require('./frontend'));
// router.use('/control', require('./adminPanel'));

module.exports = router;
