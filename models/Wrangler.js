const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


/**
 * Wrangler/User Schema
 *
 * @type module:mongoose.Schema DefaultSchemaOptions
 * {
 *  Profile: {
 *     firstName, lastName, age, email, backgroundDescription, profileImg
 *  }
 *  Password:{}
 *  }
 */
const wranglerSchema = new mongoose.Schema({
    profile: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            maxLength: 15
        },
        LastName: {
            type: String,
            required: [true, 'Last Name is required'],
            maxLength: 15
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [13, 'Must be 13 or older']
        },
        email: {
            type: String,
            required: true,
            maxLength: 50,
            unique: true
        },
        backgroundDescription: {
            type: String,
            maxLength: [255, 'Max of 255 characters']
        },
        profileImg: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required'], min: [7, 'Must be at least 7 characters'], validate: {
        validator: function (value) {
            return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/.test(value);
        },
            message:'Must include a special character, number, and a capital'
        }}
});

/**
 * Save Hook
 * Hashes new password for storing users data
 */
wranglerSchema.pre('save', async function (next) {
   console.log('Pre Save has been initialized.');

    if (!this.isModified('password')) {
        return next();
    }
try {
    //Hashing password
    console.log('hashing password')
    this.password = await bcrypt.hash(this.password, 12);
    next();
} catch (error) {
    next(error);
}
});


/**
 * Update Hook
 * Hashes a user's password on update
 *
 *
 */
wranglerSchema.pre(['updateOne','findByIdAndUpdate', 'findOneAndUpdate'], async function (next) {
    const data = this.getUpdate();
    await this.validate(data)
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 12);
    }
    next()
})



module.exports = mongoose.models.Wrangler || mongoose.model('Wrangler', wranglerSchema);





/**
 * Use Later for Form validation and validation before sending to the database with mongoose
 * Possibility at least
 * @param user
 * @returns {*}
 * @constructor
 */
//
// function ValidateUser(user) {
//     const JoiSchema = Joi.object({
//         email: Joi.string().email().required(),
//         phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
//         birthday: Joi.date().max('1-1-2004').iso()
//     }).options({abortEarly: false});
//     return JoiSchema.validate(user);
// }
//
// const validatedUser = ValidateUser(req.body);
//
// const id = Math.ceil(Math.random() * 9999999);
//
//
// if (validatedUser.error) {
//     res.status(422).json({
//         status: 'error',
//         message: 'Invalid request data',
//         data: validatedUser.error.details
//     });
// } else {
//     res.json({
//         status: 'success',
//         message: 'User created successfully',
//         data: Object.assign({id}, validatedUser)
//     });
// }
//
