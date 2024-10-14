require('dotenv').config({path:'.env'});
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const {urlencoded} = require("express");
const {connectDatabase} = require("./data/connect-db");
const swaggerDocument = require('./swagger.json');
const errorHandlers = require('./handlers/errorHandler');
const GitHubStrategy = require('passport-github2').Strategy;

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
    .use(express.json())
    .use(urlencoded({extended: true}))
    .use(cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        origin: '*',
    }))
    .use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use('/', require('./routes/index'))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //Where to direct after official authorization
    callbackURL: process.env.GITHUB_REDIRECT_URL
    //GitHub requires applications to provide the accessToken, refreshToken, and User profile. Then, calls the done callback to send back a user. Credentials will be false if validation failed, and err needs to be set so it can be thrown.
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    return done(null, profile);
}))

passport.serializeUser((user, done) => {
    // console.log('serialize: ' + user);
    done(null, user);
});
passport.deserializeUser((user, done) => {
    // console.log('deserialize: ' + user);
    done(null, user);
});

app.get('/login', passport.authenticate('github'));

app.get('/github/callback', passport.authenticate('github', {
        failureRedirect: '/'
    }),
(req, res) => {
    // console.log(req.user);
    res.redirect('/');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    //Error Middleware
    .use(errorHandlers.notFound)
    .use(errorHandlers.developmentErrors)
/**
 * Establish Connection with Database
 */
app.listen(process.env.PORT, async () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
    await connectDatabase(uri);
});