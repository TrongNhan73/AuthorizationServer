import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    return res.render('home.view.ejs');
})

export default router;