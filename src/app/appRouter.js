const express = require('express');
const router = express.Router();
const detailsRouter = require('./details/detailsRouter');
const {registerMembershipState} = require("./controller");

router.use('/details/:state', [registerMembershipState, detailsRouter])

router.get('/', (req,res) => {
    res.render('index');
})

module.exports = router;