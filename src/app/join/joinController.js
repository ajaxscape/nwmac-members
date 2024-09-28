const viewEnterName = (_, res) => {
    res.render('pages/join/name', {});
}

const postEnterName = (_, res) => {
    res.redirect('/join/address');
}

const viewEnterAddress = (_, res) => {
    res.render('pages/join/address', {});
}

module.exports = {
    viewEnterName,
    postEnterName,
    viewEnterAddress,
}