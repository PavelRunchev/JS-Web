const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String, required: true },
    lastName: { type: mongoose.Schema.Types.String, required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: [] }],
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.String }],
    profilePicture: { type: mongoose.Schema.Types.String},
});

userSchema.method({
    matchPassword: function(password) {
        return bcrypt.compare(password, this.hashedPass);
    }
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) { next(err); return; }
        bcrypt.hash(this.password, salt, (err, hash) => {
          if (err) { next(err); return; }
          this.password = hash;
          next();
        });
      });
      return;
    }
    next();
  });

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async() => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) { next(err); return; }
            bcrypt.hash('123', salt, (err, hash) => {
                if(err) { next(err); return; }
                return User.create({
                    username: 'abobo',
                    salt,
                    hashedPass: hash,
                    firstName: 'Abobo',
                    lastName: 'Bobchev',
                    teams: [],
                    roles: ['User', 'Admin'],
                    profilePicture: 'https://icon-library.net/images/principal-icon/principal-icon-11.jpg'
                });
            });
        });
    } catch (next) {
        next();
    }
};

module.exports = User;