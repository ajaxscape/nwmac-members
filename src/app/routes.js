const express = require('express');
const router = express.Router();
const detailsRouter = require('./details/detailsRoutes');

router.use('/details/:state', detailsRouter)

router.get('/', (req,res) => {
    res.render('index');
})

module.exports = router;