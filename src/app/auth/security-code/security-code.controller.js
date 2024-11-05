import { getMembers } from '../../../repositories/member.repository.js'

export const viewSecurityCode = (req, res) => {
  res.render('pages/auth/security-code', {
    locals: res.locals,
    securityCode: process.env.SKIP_SECURITY_CODE_EMAIL
      ? req.session.securityCode
      : ''
  })
}

export const postSecurityCode = async (req, res) => {
  const { securityCode } = req.body
  const isValidCode = securityCode === req.session.securityCode.toString()
  if (!isValidCode) {
    return res.render('pages/auth/security-code', {
      locals: res.locals,
      errors: [
        { id: securityCode, msg: 'Invalid security code. Please try again.' }
      ]
    })
  }
  const [member] = await getMembers({ email: req.session.email })
  if (member) {
    res.redirect(`/auth/trust-browser`)
  } else {
    res.redirect('/details')
  }
}
