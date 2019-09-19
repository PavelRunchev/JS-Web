const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    description: { type: mongoose.SchemaTypes.String, required: true },
    team: { type: mongoose.SchemaTypes.ObjectId, ref: 'Team' }
});

projectSchema.path('name').validate(function() {
    return this.name.length > 0;
}, 'Name cannot be empty!');

projectSchema.path('description').validate(function() {
    return this.description.length > 0 && this.description.length <= 50;
}, 'Description must be max 50 character!');

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;