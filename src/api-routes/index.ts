import express from "express";

const router = express.Router();

/* The purpose of having index is to write neat code and keep all the routes at one place */
router.use('/send-all', require('./send_all'));
router.use('/send', require('./send'));

module.exports = router