const m2s = require('mongoose-to-swagger');
const Wrangler = require('./models/Wrangler');
const Bunny = require('./models/Bunny');

//Takes mongoose schemas and converts them to usable swagger models
const swaggerDefinitions =  {
    wrangler: m2s(Wrangler),
    bunny: m2s(Bunny)
}

module.exports = swaggerDefinitions;