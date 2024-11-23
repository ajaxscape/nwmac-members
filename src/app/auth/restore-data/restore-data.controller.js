import { getMembers } from '#repos/member.repository.js'

export const restoreDataController = async (req, res) => {
  const { nextUrl } = req.session || {}

  if (nextUrl) {
    delete req.session.nextUrl
    return res.redirect(nextUrl)
  }

  const [member] = await getMembers({ email: req.session.email })
  if (member && req.signedCookies.email) {
    res.redirect(`/auth/trust-browser`)
  } else {
    res.redirect('/details')
  }
}
