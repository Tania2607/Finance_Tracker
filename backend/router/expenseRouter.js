const { createEntry, deleteEntry, getCategoryEntry, getAllEntries, getSummary, emailSender } = require('../controller/expenseController');

const router = require('express').Router();

router.post('/addEntry', createEntry);
router.post('/deleteEntry', deleteEntry);
router.post('/allEntries', getAllEntries);
router.post('/summary', getSummary);
router.get('/categoryEntry', getCategoryEntry);
router.post('/sendEmail', emailSender);

module.exports = router;