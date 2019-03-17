import dateo, { Dateo } from '../src/index.js'

let assert = require('assert')

describe('Dateo', function () {
	describe('new Dateo', function () {
		it('fails if unknown date format passed to constructor', function () {
			try {
				// eslint-disable-next-line no-unused-vars
				const date = new Dateo('asdf')
				assert.fail('should have thrown')
			} catch (error) {
				assert.strictEqual(error.toString(), 'Error: Invalid date string passed, expected format YYYY-MM-DD')
			}
		})
		it('creates the expected underlying Date object when no argument passed', function () {
			const date = new Dateo()
			const now = new Date()
			const expected = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			assert.strictEqual(date.$d.toISOString(), expected.toISOString())
		})
		it('allows creation with the factory function', function () {
			const date = dateo()
			const now = new Date()
			const expected = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			assert.strictEqual(date.$d.toISOString(), expected.toISOString())
		})
		it('creates the expected underlying Date object when formatted date passed', function () {
			const date = new Dateo('2019-03-11')
			assert.strictEqual(date.$d.toISOString(), '2019-03-11T00:00:00.000Z')
			assert.strictEqual(date.date, 11)
			assert.strictEqual(date.day, 1)
			assert.strictEqual(date.month, 2)
			assert.strictEqual(date.year, 2019)
		})
		it('creates an immutable object', function () {
			const date = dateo('2019-03-11')
			// try setting a property directly
			try {
				date.date = 10
				assert.fail('expected error')
			} catch (e) {
				assert.strictEqual(date.date, 11)
			}

			// eslint-disable-next-line no-unused-vars
			const newDate = date.add(1, 'd')
			assert.strictEqual(date.toString(), '2019-03-11')
		})
	})
})
