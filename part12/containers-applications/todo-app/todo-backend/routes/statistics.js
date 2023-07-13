const express = require('express');
const redis = require('../redis');

const router = express.Router();

router.get('/', async (_, res) => {
    const addedCount = await redis.getAsync('added_todos');
    res.json({ added_todos: Number(addedCount) });
});

module.exports = router;
