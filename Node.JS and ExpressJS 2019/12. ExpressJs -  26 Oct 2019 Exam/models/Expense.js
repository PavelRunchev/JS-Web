const mongoose =  require('mongoose');

const expenseSchema = new mongoose.Schema({
    merchant: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    date: { type: mongoose.SchemaTypes.Date, required: true, default: Date.now },
    total: { type: mongoose.SchemaTypes.Number, required: true },
    category: { type: mongoose.SchemaTypes.String, required: true },
    description: { type: mongoose.SchemaTypes.String, required: true, min: 10, max: 50 },
    report: { type: mongoose.SchemaTypes.Boolean, required: true, default: false },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;