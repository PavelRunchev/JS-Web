const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    projects: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Project' }],
    members: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }]
});

teamSchema.path('name').validate(function() {
    return this.name.length > 0;
}, 'Name cannot be empty!');

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;