import dateo, { Dateo } from '../src/index.js'

let assert = require('assert')

describe('Dateo', function () {
	describe('format', function () {
		it('allows formatting based on standard strings', function () {
			// const date = new Dateo('2019-03-12')
			const date = dateo('2019-03-12')
			assert(date instanceof Dateo)
			assert.strictEqual(date.format(), '2019-03-12')
			assert.strictEqual(date.format('YY'), '19')
			assert.strictEqual(date.format('YYYY'), '2019')
			assert.strictEqual(date.format('M'), '3')
			assert.strictEqual(date.format('MM'), '03')
			assert.strictEqual(date.format('MMM'), 'Mar')
			assert.strictEqual(date.format('MMMM'), 'March')
			assert.strictEqual(date.format('D'), '12')
			assert.strictEqual(date.format('DD'), '12')
			assert.strictEqual(date.format('d'), '2')
			assert.strictEqual(date.format('dd'), 'Tu')
			assert.strictEqual(date.format('ddd'), 'Tue')
			assert.strictEqual(date.format('dddd'), 'Tuesday')
			assert.strictEqual(date.format('MMM D'), 'Mar 12')
			assert.strictEqual(date.format('MM/DD/YYYY'), '03/12/2019')
			assert.strictEqual(date.format('[MM] MM/DD/YYYY'), 'MM 03/12/2019')
		})
	})
})
