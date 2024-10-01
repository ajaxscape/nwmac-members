const viewSelectMembershipType = (req, res) => {
    res.render('pages/details/membership-type', { locals: res.locals });
}

const postSelectMembershipType = (req, res) => {
    res.redirect(`/details/${res.locals.state}/age`);
}

const viewEnterAge = (req, res) => {
    res.render('pages/details/age', { locals: res.locals });
}

const postEnterAge = (req, res) => {
    res.redirect(`/details/${res.locals.state}/name`);
}

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
    res.redirect(`/details/${res.locals.state}`);
}

module.exports = {
    viewSelectMembershipType,
    postSelectMembershipType,
    viewEnterName,
    postEnterName,
    viewEnterAddress,
    postEnterAddress,
    viewEnterAge,
    postEnterAge
}