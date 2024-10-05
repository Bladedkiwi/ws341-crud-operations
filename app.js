require('dotenv').config({path:'.env'});
const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const {urlencoded} = require("express");
const {connectDatabase} = require("./data/connect-db");
const swaggerDocument = require('./swagger.json');
const errorHandlers = require('./errorHandler');
require('./models/Wrangler');
require('./models/Bunny');


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.MONGO_URL}`


/**
 * Parse Incoming Requests
 * Setup Swagger
 * Set Headers
 * Set Routes
 */

app
    .use('./api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(express.json())
    .use(urlencoded({extended: true}))
    .use(cors())
    .use('/', require('./routes/index'))
    .use(errorHandlers.notFound)
    .use(errorHandlers.developmentErrors)



/**
 * Establish Connection with Database
 */
app.listen(process.env.PORT, async () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
    await connectDatabase(uri);
});