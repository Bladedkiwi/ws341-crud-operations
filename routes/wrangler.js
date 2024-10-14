const {catchErrors} = require("../handlers/errorHandler");
const router = require("express").Router();
const wranglerController = require("../controllers/wrangler-controller");
const {isAuthenticated} = require("../handlers/authHandler");


/**
 * User Routes
 * Adding the catchErrors buffer allows the server to keep running while throwing errors into the wind
 * Unless of course, something catastrophic occurs
 */
router.get('/', catchErrors(wranglerController.getAllWranglers));
router.get('/:id', catchErrors(wranglerController.getWranglerById));

router.post('/', isAuthenticated, catchErrors(wranglerController.createWrangler));
router.put('/:id', isAuthenticated, catchErrors(wranglerController.updateWrangler));
router.delete('/:id', isAuthenticated, catchErrors(wranglerController.deleteWrangler));

module.exports = router;
