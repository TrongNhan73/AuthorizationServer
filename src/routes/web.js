import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    return res.send('hello world');
})

export default router;