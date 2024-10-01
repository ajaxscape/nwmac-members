const express = require('express');
const {viewEnterAddress, viewEnterName, postEnterName, viewSelectMembershipType, postSelectMembershipType, viewEnterAge,
    postEnterAge, postEnterAddress
} = require("./detailsController");
const router = express.Router();

router
    .route('/name')
    .get(viewEnterName)
    .post(postEnterName)

router
    .route('/membership-type')
    .get(viewSelectMembershipType)
    .post(postSelectMembershipType)

router
    .route('/address')
    .get(viewEnterAddress)
    .post(postEnterAddress)

router
    .route('/age')
    .get(viewEnterAge)
    .post(postEnterAge)

router.get('/', (req,res) => {
    res.render('index');
})

module.exports = router;