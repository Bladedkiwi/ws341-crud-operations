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
const doc = {
    info: {
        title: 'Contacts Directory and CRUD operations',
        description: 'Create, Retrieve, update, and delete.'
    },
    host:'localhost:8888'
}


const outputFile = './swagger.json';

const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc).then(async () => {
    await import('./app.js')
});