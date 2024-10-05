const mongoose = require("mongoose");

async function connectDatabase(uri) {
    await mongoose.connect(uri)
        .then(() => {
            console.log('Connected to Database')

        })
        .catch((err) => console.log(`MongoDB connection error: ${err}`));
}

module.exports = { connectDatabase };