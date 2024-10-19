import { nanoid } from 'nanoid'

const currentTokens = []
const tokenTimeout = 10 * 60 * 1000 // 10 minutes

export const generateToken = (email) => {
  const token = nanoid()
  currentTokens.push({
    expires: Date.now() + tokenTimeout,
    email,
    token
  })
  return token
}

export const retrieveEmailFromToken = (token) => {
  // remove any old tokens
  while (
    currentTokens.some((currentToken) => currentToken.expires < Date.now())
  ) {
    currentTokens.splice(
      currentTokens.findIndex(
        (currentToken) => currentToken.expires < Date.now()
      ),
      1
    )
  }

  // retrieve token
  const [currentToken] = currentTokens.splice(
    currentTokens.findIndex((currentToken) => currentToken.token === token)
  )

  // return email
  return currentToken?.email
}
