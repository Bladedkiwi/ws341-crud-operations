const m2s = require('mongoose-to-swagger');
const Wrangler = require('./models/Wrangler');
const Bunny = require('./models/Bunny');

// Supposed to help make the mongoose schema translation easier to do, but it simply didn't do anything regardless of it consoling correctly.
//The translation defines everything as objects, and attaches the title of the schema to it. Along with including type: object to each section.
// Basically a mess.
// Manually altered the Swagger json file.
const options = m2s(Wrangler, {
    omitFields: ['_id', '__v', 'title'],
    omitRequired: true,
    omitTimestamps: true
});





//Takes mongoose schemas and converts them to usable swagger models
const swaggerDefinitions =  {
    wrangler: m2s(Wrangler, options),
    bunny: m2s(Bunny, options)
}

module.exports = swaggerDefinitions;