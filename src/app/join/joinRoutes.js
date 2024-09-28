const express = require('express');
const {viewEnterAddress, viewEnterName, postEnterName} = require("./joinController");
const router = express.Router();

router
    .route('/name')
    .get(viewEnterName)
    .post(postEnterName)

router
    .route('/address')
    .get(viewEnterAddress)

router.get('/', (req,res) => {
    res.render('index');
})

module.exports = router;