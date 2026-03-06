// backend/routes/tickets.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { protect } = require('../middleware/auth');

// @desc    Get tickets
// @route   GET /api/tickets
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let tickets;

        // Admin sees all tickets, user sees only their own
        if (req.user.role === 'admin') {
            tickets = await Ticket.find().sort({ createdAt: -1 });
        } else {
            tickets = await Ticket.find({ userId: req.user.id }).sort({ createdAt: -1 });
        }

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a ticket
// @route   POST /api/tickets
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { employeeId, fullName, officialEmail, department, designation, zip } = req.body;

        if (!employeeId || !fullName || !officialEmail || !department || !designation || !zip) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const ticket = await Ticket.create({
            userId: req.user.id,
            employeeId,
            fullName,
            officialEmail,
            department,
            designation,
            zip,
        });

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update a ticket
// @route   PUT /api/tickets/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Make sure user owns ticket or is admin
        if (ticket.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to update this ticket' });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete a ticket
// @route   DELETE /api/tickets/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Make sure user owns ticket or is admin
        if (ticket.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to delete this ticket' });
        }

        await ticket.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Ticket removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
