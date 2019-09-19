const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String, required: true },
    lastName: { type: mongoose.Schema.Types.String, required: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    profilePicture: { type: mongoose.Schema.Types.String },
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
            firstName: 'Bobcho',
            lastName: 'Bobchev',
            team: [],
            profilePicture: 'http://www.sclance.com/images/admin/Admin_20122.png',
            roles: ['Admin', 'User']
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;