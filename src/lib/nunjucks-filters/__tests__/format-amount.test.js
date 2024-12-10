import {describe, it} from 'node:test'
import * as assert from 'node:assert'
import formatAmount from '#nunjucks-filters/format-amount.js'

describe('format-amount', () => {
  [
    {amount: 0.9, formattedAmount: '&pound;0.01'},
    {amount: 0.4, formattedAmount: '&pound;0.00'},
    {amount: 999, formattedAmount: '&pound;9.99'},
    {amount: 9999999, formattedAmount: '&pound;99999.99'}]
  .map(({amount, formattedAmount}) => {
    it(`should format correctly ${amount} as ${formattedAmount}`, () => {
      assert.equal(formatAmount(amount), formattedAmount)
    })
  })

  it(`should throw when null`, () => {
    function errorThrowingWrapper () {
      formatAmount(null)
    }

    assert.throws(errorThrowingWrapper, TypeError)
  })

  it(`should throw when not a number`, () => {
    function errorThrowingWrapper () {
      formatAmount('string')
    }

    assert.throws(errorThrowingWrapper, TypeError)
  })
})