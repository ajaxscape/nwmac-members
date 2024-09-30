const viewEnterName = (req, res) => {
    res.render('pages/details/name', { locals: res.locals });
}

const postEnterName = (req, res) => {
    res.redirect(`/details/${res.locals.state}/address`);
}

const viewEnterAddress = (req, res) => {
    res.render('pages/details/address', { locals: res.locals });
}

const postEnterAddress = (req, res) => {
    res.redirect(`/details/${res.locals.state}/age`);
}

module.exports = {
    viewEnterName,
    postEnterName,
    viewEnterAddress,
}