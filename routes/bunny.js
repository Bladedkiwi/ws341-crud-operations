const {catchErrors} = require("../handlers/errorHandler");
const router = require("express").Router();
const bunnyController = require("../controllers/bunny-controller");
const {isAuthenticated} = require("../handlers/authHandler");




/**
 * Bunny Routes
 */
router.get('/', catchErrors(bunnyController.getAllBunny));
router.get('/:id', catchErrors(bunnyController.getBunnyById));

router.post('/',isAuthenticated, catchErrors(bunnyController.createBunny));
router.put('/:id',isAuthenticated, catchErrors(bunnyController.updateBunny));
router.delete('/:id',isAuthenticated, catchErrors(bunnyController.deleteBunny));


module.exports = router;