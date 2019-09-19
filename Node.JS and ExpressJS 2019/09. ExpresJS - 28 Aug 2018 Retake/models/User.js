const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
    followedChannels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
    roles: [{ type: mongoose.Schema.Types.String }]
});

userSchema.method({
    authenticate: function(password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async() => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, '123');
        return User.create({
            username: 'abobo',
            salt,
            hashedPass,
            email: 'abobo@abv.bg',
            followedChannels: [],
            roles: ['Admin', 'User']
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;