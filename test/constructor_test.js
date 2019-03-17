let assert = require('assert');

const Dateo = require('../src/index.js').default;

describe('Dateo', function () {
	describe('new Dateo', function () {
		it('fails if unknown date format passed to constructor', function () {
			try {
				const dater = new Dateo('asdf')
				assert.fail('should have thrown')
			} catch (error) {
				assert.equal(error, 'Invalid date string passed, expected format YYYY-MM-DD');
			}
		});
		it('creates the expected underlying Date object when no argument passed', function () {
			const dater = new Dateo()
			const now = new Date()
			const expected = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			assert.equal(dater.$d.toISOString(), expected.toISOString())
		});
		it('creates the expected underlying Date object when formatted date passed', function () {
			const dater = new Dateo('2019-03-11')
			assert.equal(dater.$d.toISOString(), '2019-03-11T00:00:00.000Z');
			assert.equal(dater.date, 11)
			assert.equal(dater.day, 1)
			assert.equal(dater.month, 2)
			assert.equal(dater.year, 2019)
		});
	});
});