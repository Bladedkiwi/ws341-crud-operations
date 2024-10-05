const mongoose = require('mongoose');



/**
 * Bunny Schema
 *
 * @type module:mongoose.Schema DefaultSchemaOptions
 * {
 *  name, age, color, description, img
 *  }
 */
const bunnySchema = new mongoose.Schema({
            name: {
                type: String,
                required: [true, 'First name is required'],
                maxLength: 15
            },
            age: Number,
            color: {
                type: String,
                required: [true, 'Color is required'],
                maxLength: 15
            },
            description: {
                type: String,
                maxLength: [255, 'Max of 255 characters']
            },
            image: {
                type: String,
                required: [true, 'Image is required'],
            }
    }
);





module.exports = mongoose.models.Bunny || mongoose.model('Bunny', bunnySchema);

