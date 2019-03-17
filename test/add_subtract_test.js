import { Dateo } from '../src/index.js'
let assert = require('assert')

describe('Dateo', function () {
	describe('add', function () {
		it('clones the calling Dateo object', function () {
			const dater = new Dateo('2019-02-28')
			const added = dater.add(5, 'd')
			assert.notStrictEqual(added, dater)
		})
		it('adds days to date', function () {
			const dater = new Dateo('2019-02-28')
			const added = dater.add(5, 'd')
			assert.strictEqual(added.toString(), '2019-03-05')
		})
		it('adds days correctly across leap year', function () {
			const dater = new Dateo('2020-02-28')
			const added = dater.add(5, 'd')
			assert.strictEqual(added.toString(), '2020-03-04')
		})
		it('adds days correctly across years', function () {
			const dater = new Dateo('2019-12-30')
			const added = dater.add(5, 'd')
			assert.strictEqual(added.toString(), '2020-01-04')
		})

		it('adds weeks to date', function () {
			const dater = new Dateo('2019-02-28')
			const added = dater.add(2, 'w')
			assert.strictEqual(added.toString(), '2019-03-14')
		})
		it('adds weeks correctly across leap year', function () {
			const dater = new Dateo('2020-02-28')
			const added = dater.add(2, 'w')
			assert.strictEqual(added.toString(), '2020-03-13')
		})

		it('adds months to date', function () {
			const dater = new Dateo('2019-02-28')
			const added = dater.add(2, 'm')
			assert.strictEqual(added.toString(), '2019-04-28')
		})
		it('adds months correctly across leap year', function () {
			const dater = new Dateo('2020-02-28')
			const added = dater.add(2, 'm')
			assert.strictEqual(added.toString(), '2020-04-28')
		})
		it('adds months correctly across months of differing lengths', function () {
			const dater = new Dateo('2019-01-31')
			const added = dater.add(1, 'm')
			assert.strictEqual(added.toString(), '2019-02-28')
		})
		it('adds months correctly across years', function () {
			const dater = new Dateo('2019-01-31')
			const added = dater.add(15, 'm')
			assert.strictEqual(added.toString(), '2020-04-30')
		})

		it('adds years to date', function () {
			const dater = new Dateo('2019-02-28')
			const added = dater.add(2, 'y')
			assert.strictEqual(added.toString(), '2021-02-28')
		})
	})

	describe('subtract', function () {
		it('clones the calling Dateo object', function () {
			const dater = new Dateo('2019-02-28')
			const subtracted = dater.subtract(5, 'd')
			assert.notStrictEqual(subtracted, dater)
		})
		it('subtracts days to date', function () {
			const dater = new Dateo('2019-02-28')
			const subtracted = dater.subtract(5, 'd')
			assert.strictEqual(subtracted.toString(), '2019-02-23')
		})
		it('subtracts days correctly across leap year', function () {
			const dater = new Dateo('2020-03-04')
			const subtracted = dater.subtract(5, 'd')
			assert.strictEqual(subtracted.toString(), '2020-02-28')
		})
		it('subtracts days correctly across years', function () {
			const dater = new Dateo('2020-01-04')
			const subtracted = dater.subtract(5, 'd')
			assert.strictEqual(subtracted.toString(), '2019-12-30')
		})

		it('subtracts weeks from date', function () {
			const dater = new Dateo('2019-03-14')
			const subtracted = dater.subtract(2, 'w')
			assert.strictEqual(subtracted.toString(), '2019-02-28')
		})
		it('subtracts weeks correctly across leap year', function () {
			const dater = new Dateo('2020-03-13')
			const subtracted = dater.subtract(2, 'w')
			assert.strictEqual(subtracted.toString(), '2020-02-28')
		})

		it('subtracts months to date', function () {
			const dater = new Dateo('2019-04-28')
			const subtracted = dater.subtract(2, 'm')
			assert.strictEqual(subtracted.toString(), '2019-02-28')
		})
		it('subtracts months correctly across leap year', function () {
			const dater = new Dateo('2020-04-29')
			const subtracted = dater.subtract(2, 'm')
			assert.strictEqual(subtracted.toString(), '2020-02-29')
		})
		it('subtracts months correctly across months of differing lengths', function () {
			const dater = new Dateo('2019-03-31')
			const subtracted = dater.subtract(1, 'm')
			assert.strictEqual(subtracted.toString(), '2019-02-28')
		})
		it('subtracts months correctly across years', function () {
			const dater = new Dateo('2020-05-01')
			const subtracted = dater.subtract(15, 'm')
			assert.strictEqual(subtracted.toString(), '2019-02-01')
		})

		it('subtracts years to date', function () {
			const dater = new Dateo('2021-02-28')
			const subtracted = dater.subtract(2, 'y')
			assert.strictEqual(subtracted.toString(), '2019-02-28')
		})
	})
})
