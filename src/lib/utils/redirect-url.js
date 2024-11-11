export const redirectUrl = (page, res) =>
  `/details/${res.locals.edit ? 'check-details' : page}`
