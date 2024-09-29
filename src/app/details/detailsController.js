const viewEnterName = (_, res) => {
    res.render('pages/details/name', {});
}

const postEnterName = (req, res) => {
    res.redirect('/join/address');
}

const viewEnterAddress = (_, res) => {
    res.render('pages/details/address', {});
}

module.exports = {
    viewEnterName,
    postEnterName,
    viewEnterAddress,
}