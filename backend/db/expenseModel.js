const mongoose = require('mongoose');

// Minimal schema: only required fields for a transaction
const entrySchema = new mongoose.Schema({
    usersid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const entryModel = mongoose.model('entries', entrySchema);

module.exports = entryModel;