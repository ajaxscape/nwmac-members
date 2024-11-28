import sentenceCase from '#utils/sentence-case.js'

export default (subscriptions) =>
  Object.entries(subscriptions).map(([key, value]) => ({
    key: sentenceCase(key).replace('Bmfa ', 'BMFA ').replace('Caa ', 'CAA '),
    value: value
  }))
