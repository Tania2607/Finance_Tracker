const entryModel = require('../db/expenseModel');
const userModel = require('../db/userModel');
const sendEmailWithAttachment = require('../utils/emailSend');
const { error, success } = require('../utils/handler');

const createEntry = async (req, res) => {
    try {
        // Log the incoming request body for debugging
        console.log('Received transaction request:', req.body);
        const { amount, category, date, usersid, type } = req.body;
        // Only require the necessary fields
        if (!amount || !category || !date || !usersid || !type) {
            console.log('Missing required field(s)');
            return res.send(error(401, "All Details Are Required"));
        }
        // Ensure user exists
        const userToUse = await userModel.findById(usersid).populate('expense_id');
        if (!userToUse) {
            console.log('User not found:', usersid);
            return res.send(error(404, "User not found"));
        }
        // Create and save entry (minimal fields)
        const newEntry = await entryModel.create({ amount, category, date, usersid, type });
        userToUse.expense_id.push(newEntry._id);
        await newEntry.save();
        await userToUse.save();
        console.log('Transaction added successfully:', newEntry);
        return res.send(success(200, newEntry));
    } catch (e) {
        console.log('Error in createEntry:', e);
        return res.send(error(401, e.message));
    }
};

const deleteEntry = async (req, res) => {
    try {
        const { entryId, userId } = req.body;
        const entry = await entryModel.findById(entryId);
        const user = await userModel.findById(userId);
        if (!entry || !user) {
            return res.send(error(401, `Invalid ${!entry} + ${!user}`));
        }
        if (user.expense_id.includes(entryId)) {
            await entryModel.findByIdAndDelete(entryId);
            const index = user.expense_id.indexOf(entryId);
            user.expense_id.splice(index, 1);
        }
        await user.save();
        return res.send(success(201, { respo: 'Successfully Deleted', user }));
    } catch (e) {
        return res.send(error(401, e.message));
    }
};

const getAllEntries = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).populate('expense_id');
        return res.send(success(200, user.expense_id.sort((a, b) => new Date(b.date) - new Date(a.date))));
    } catch (e) {
        return res.send(error(401, e.message));
    }
};

const getSummary = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).populate('expense_id');
        const entries = user.expense_id;
        const totalIncome = entries.filter(e => e.type === 'income').reduce((sum, e) => sum + (e.amount || 0), 0);
        const totalExpense = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + (e.amount || 0), 0);
        return res.send(success(200, {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense
        }));
    } catch (e) {
        return res.send(error(401, e.message));
    }
};

const getCategoryEntry = async (req, res) => {
    // Optionally implement category-wise summary
    try {
        return res.send(success(200, []));
    } catch (e) {
        return res.send(error(401, e.message));
    }
};

const emailSender = (req, res) => {
    try {
        const { recipient, body } = req.body;
        sendEmailWithAttachment(recipient, body);
        return res.send(success(201, "Email Sent"));
    } catch (error) {
        return res.send(error(401, "Email Is Wrong"));
    }
};

module.exports = {
    createEntry,
    deleteEntry,
    getCategoryEntry,
    getAllEntries,
    getSummary,
    emailSender
};