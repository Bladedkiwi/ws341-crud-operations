const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const wranglerController = require("../controllers/wrangler-controller");
const bunnyController = require("../controllers/bunny-controller");
const {catchErrors} = require('../errorHandler')

/**
 * Base Route
 */
router.get('/', (req, res) => {res.send('Bring on the Bunny Wranglers')});

/**
 * User Routes
 * Adding the catchErrors buffer allows the server to keep running while throwing errors into the wind
 * Unless of course, something catastrophic occurs
 */
router.get('/wrangler', catchErrors(wranglerController.getAllWranglers));

router.post('/wrangler', catchErrors(wranglerController.createWrangler));

router.get('/wrangler/:id',catchErrors(wranglerController.getWranglerById));

router.put('/wrangler/:id', catchErrors(wranglerController.updateWrangler));

router.delete('/wrangler/:id', catchErrors(wranglerController.deleteWrangler));



/**
 * Bunny Routes
 */
router.get('/bunny', catchErrors(bunnyController.getAllBunny));

router.post('/bunny', catchErrors(bunnyController.createBunny));

router.get('/bunny/:id',catchErrors(bunnyController.getBunnyById));

router.put('/bunny/:id', catchErrors(bunnyController.updateBunny));

router.delete('/bunny/:id', catchErrors(bunnyController.deleteBunny));



/**
 * Development Debug Routes
 */

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;