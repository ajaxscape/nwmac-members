/**
 * Creates an error object with text and href properties.
 * @param {string} errorId
 * @param {string|Object} errorDetails
 * @returns {Object}
 */
function createErrorObject(errorId, errorDetails) {
  if (typeof errorDetails === 'string') {
    return { text: errorDetails, href: `#${errorId}` }
  } else {
    return { text: errorDetails.msg, href: `#${errorDetails.id ?? errorId}` }
  }
}

module.exports = (errors) =>
  Object.entries(errors).map(([errorId, errorDetails]) =>
    createErrorObject(errorId, errorDetails)
  )
