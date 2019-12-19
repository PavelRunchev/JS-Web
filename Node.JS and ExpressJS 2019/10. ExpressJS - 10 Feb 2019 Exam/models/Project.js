const  mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true, uniquie: true },
    description: { type: mongoose.SchemaTypes.String, required: true, maxlength: 50 },
    team: { type: mongoose.SchemaTypes.ObjectId, ref: 'Team', default: null }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;