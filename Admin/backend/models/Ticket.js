// backend/models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        employeeId: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        officialEmail: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        zip: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'Pending',
        },
        date: {
            type: String,
            default: () => new Date().toLocaleString(),
        },
    },
    {
        timestamps: true,
        collection: 'Ticket'
    }
);

module.exports = mongoose.model('Ticket', ticketSchema);
