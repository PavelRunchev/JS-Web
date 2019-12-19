const mongoose =  require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    projects: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Project', default: []}],
    members: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', default: []}]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;