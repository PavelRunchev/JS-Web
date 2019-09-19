const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.SchemaTypes.String, unique: true, required: true },
    password: { type: mongoose.SchemaTypes.String },
    salt: { type: mongoose.SchemaTypes.String, required: true },
    firstName: { type: mongoose.SchemaTypes.String },
    lastName: { type: mongoose.SchemaTypes.String },
    age: {
        type: mongoose.SchemaTypes.Number,
        min: [0, 'Age must be between 0 and 120'],
        max: [120, 'Age must be between 0 and 120']
    },

    gender: {
        type: mongoose.SchemaTypes.String,
        enum: {
            values: ['Male', 'Female'],
            message: 'Gender should be either "Male" or "Female".'
        }
    },

    boughtProducts: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Product' }],
    createdProduct: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Product' }],
    createdCategories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    roles: [{ type: mongoose.SchemaTypes.String }]
});

userSchema.method({
    authenticate: function(password) {
        let hashedPassword = encryption.generateHashedPassword(this.salt, password);
        if (hashedPassword === this.password) return true;

        return false;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async() => {
    try {
        let users = await User.find();
        if (users.length > 0) return;

        let salt = encryption.generateSalt();
        let hashedPass = encryption.generateHashedPassword(salt, '123');

        return User.create({
            username: 'abobo',
            firtName: 'Bobcho',
            lastName: 'Bobchev',
            salt: salt,
            password: hashedPass,
            age: 35,
            gender: 'Male',
            roles: ['Admin', 'User']
        });
    } catch (err) { console.log(err.message); }
};



module.exports = User;