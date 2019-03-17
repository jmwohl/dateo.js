import { Dateo } from '../src/index.js'

let assert = require('assert')

describe('Dateo', function () {
	describe('startOf', function () {
		it('returns a new dater for the start of the month', function () {
			let dater = new Dateo('2019-02-03')
			let start = dater.startOf('m')
			assert.strictEqual(start.toString(), '2019-02-01')

			dater = new Dateo('2019-01-31')
			start = dater.startOf('m')
			assert.strictEqual(start.toString(), '2019-01-01')
		})

		it('returns a new dater for the start of the week', function () {
			let dater = new Dateo('2019-03-12')
			let start = dater.startOf('w')
			assert.strictEqual(start.toString(), '2019-03-10')

			dater = new Dateo('2019-02-24')
			start = dater.startOf('w')
			assert.strictEqual(start.toString(), '2019-02-24')
		})

		it('returns a new dater for the start of the year', function () {
			let dater = new Dateo('2019-03-12')
			let start = dater.startOf('y')
			assert.strictEqual(start.toString(), '2019-01-01')

			dater = new Dateo('2019-02-24')
			start = dater.startOf('y')
			assert.strictEqual(start.toString(), '2019-01-01')
		})
	})

	describe('endOf', function () {
		it('returns a new dater for the end of the month', function () {
			let dater = new Dateo('2019-02-03')
			let end = dater.endOf('m')
			assert.strictEqual(end.toString(), '2019-02-28')

			dater = new Dateo('2019-01-31')
			end = dater.endOf('m')
			assert.strictEqual(end.toString(), '2019-01-31')
		})

		it('returns a new dater for the end of the week', function () {
			let dater = new Dateo('2019-03-12')
			let end = dater.endOf('w')
			assert.strictEqual(end.toString(), '2019-03-16')

			dater = new Dateo('2019-02-24')
			end = dater.endOf('w')
			assert.strictEqual(end.toString(), '2019-03-02')
		})

		it('returns a new dater for the end of the year', function () {
			let dater = new Dateo('2019-03-12')
			let end = dater.endOf('y')
			assert.strictEqual(end.toString(), '2019-12-31')

			dater = new Dateo('2019-02-24')
			end = dater.endOf('y')
			assert.strictEqual(end.toString(), '2019-12-31')
		})
	})

	describe('daysInMonth', function () {
		it('returns the number of days in month', function () {
			let dater = new Dateo('2019-02-03')
			let numDays = dater.daysInMonth()
			assert.strictEqual(numDays, 28)

			dater = new Dateo('2019-01-31')
			numDays = dater.daysInMonth()
			assert.strictEqual(numDays, 31)
		})
	})
})
