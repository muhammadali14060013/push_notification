import express from "express";

const router = express.Router();

router.use('/send_all', require('./send_all'));
router.use('/send', require('./send'));

module.exports = router