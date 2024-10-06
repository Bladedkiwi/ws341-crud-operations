const swaggerAutogen = require('swagger-autogen')();

//Server Doc
// const doc = {
//     info: {
//         title: 'Bunny Wranglers Directory and CRUD operations',
//         description: 'Create, Retrieve, update, and delete any contact you desire.'
//         },
//         host:'ws341-crud-operations.onrender.com'
// }

//localhost doc
// const doc = {
//     info: {
//         title: 'Contacts Directory and CRUD operations',
//         description: 'Create, Retrieve, update, and delete.'
//     },
//     host:'localhost:8888',
//
// }


// const doc = {
//     info: {
//         title: 'Bunny Wrangler Directory and CRUD operations',
//         description: 'Create, Retrieve, update, and delete.'
//     },
//     host:'localhost:8888',
//     schemes: ['https', 'http'],
//     definitions: {
//         Wrangler: { // WRANGLER SCHEMA
//             type: 'object',
//             properties: {
//                 profile: {
//                     firstName: {
//                         type: 'string',
//                         description: 'User\'s first name',
//                         example: 'Harry',
//                         maxLength: 15
//                     },
//                     lastName: {
//                         type: 'string',
//                         description: 'User\'s last name',
//                         example: 'Potter',
//                         maxLength: 15
//                     },
//                     age: {
//                         type: 'integer',
//                         description: 'User\'s age (must be 13 or older)',
//                         example: 33,
//                         minimum: 13
//                     },
//                     email: {
//                         type: 'string',
//                         description: 'User\'s email address (must be unique)',
//                         example: 'harry.potter@hogwarts.com',
//                         maxLength: 50,
//                         format: 'email'
//                     },
//                     backgroundDescription: {
//                         type: 'string',
//                         description: 'Description of user\'s background',
//                         example: 'An aspiring wizard at Hogwarts School of Witchcraft and Wizardry.',
//                         maxLength: 255
//                     },
//                     profileImg: {
//                         type: 'string',
//                         description: 'URL of the user\'s profile image',
//                         example: 'http://hogwarts.com/profile/harry.jpg'
//                     }
//                 },
//                 password: {
//                     type: 'string',
//                     description: 'User\'s password (min 7 characters, must contain special character, number, uppercase, and lowercase)',
//                     example: 'P@ssword123',
//                     minLength: 7
//                 }
//             },
//             required: ['firstName', 'lastName', 'age', 'email', 'password']
//         },
//         Bunny: {  // BUNNY SCHEMA
//             type: 'object',
//             properties: {
//                 name: {
//                     type: 'string',
//                     description: 'Pet\'s name',
//                     example: 'Fluffy',
//                     maxLength: 15
//                 },
//                 age: {
//                     type: 'integer',
//                     description: 'Pet\'s age',
//                     example: 3
//                 },
//                 color: {
//                     type: 'string',
//                     description: 'Color of the pet',
//                     example: 'Golden',
//                     maxLength: 15
//                 },
//                 description: {
//                     type: 'string',
//                     description: 'A short description of the pet',
//                     example: 'A fluffy golden retriever.',
//                     maxLength: 255
//                 },
//                 image: {
//                     type: 'string',
//                     description: 'URL of the pet\'s image',
//                     example: 'http://pets.com/images/fluffy.jpg'
//                 }
//             },
//             required: ['name', 'color', 'image']
//         }
//     }
// };

const swaggerDefinitions = require('./swaggerSchemas');

const doc = {
    info: {
        title: 'My API',
        description: 'API Documentation',
    },
    host: 'localhost:8888',
    schemes: ['https','http'],
    definitions: swaggerDefinitions,
};



const outputFile = './swagger.json';

const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc).then(async () => {
    await import('./app.js')
});