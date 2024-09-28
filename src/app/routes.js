const express = require('express');
const router = express.Router();
const joinRouter = require('./join/joinRoutes');

router.use('/join', joinRouter)

router.get('/', (req,res) => {
    res.render('index');
})

module.exports = router;