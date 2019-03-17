let assert = require('assert');

const Dateo = require('../src/index.js').default;

describe('Dateo', function () {
	describe('isBefore', function () {
		it('fails if Dateo instance not passed as arg', function () {
			try {
				let dater = new Dateo('2019-02-03')
				dater.isBefore('2019-02-03')
				assert.fail('should have thrown')
			} catch (error) {
				assert.equal(error, 'isBefore must take another Dateo as an argument');
			}
		});

		it('returns true if passed Dateo is before calling Dateo', function () {
			let dater = new Dateo('2019-02-03')
			let later = new Dateo('2019-02-04')
			assert(dater.isBefore(later))
		});

		it('returns false if passed Dateo is NOT before calling Dateo', function () {
			let dater = new Dateo('2019-02-03')
			let earlier = new Dateo('2019-02-02')
			assert(!dater.isBefore(earlier))
		});

		it('returns false if passed Dateo is the same date as calling Dateo', function () {
			let dater = new Dateo('2019-02-03')
			let same = new Dateo('2019-02-03')
			assert(!dater.isBefore(same))
		});
	});

	describe('isAfter', function () {
		it('fails if Dateo instance not passed as arg', function () {
			try {
				let dater = new Dateo('2019-02-03')
				dater.isAfter('2019-02-03')
				assert.fail('should have thrown')
			} catch (error) {
				assert.equal(error, 'isAfter must take another Dateo as an argument');
			}
		});

		it('returns true if passed Dateo is after calling Dateo', function () {
			let dater = new Dateo('2019-02-03')
			let earlier = new Dateo('2019-02-02')
			assert(dater.isAfter(earlier))
		});

		it('returns false if passed Dateo is NOT after calling Dateo', function () {
			let dater = new Dateo('2019-02-03')
			let later = new Dateo('2019-02-04')
			assert(!dater.isAfter(later))
		});

		it('returns false if passed Dateo is the same date as calling Dateo', function () {
			let dater = new Dateo('2019-02-03')
			let same = new Dateo('2019-02-03')
			assert(!dater.isAfter(same))
		});
	});

	describe('isSame', function () {
		it('fails if Dateo instance not passed as arg', function () {
			try {
				let dater = new Dateo('2019-02-03')
				dater.isSame('2019-02-03')
				assert.fail('should have thrown')
			} catch (error) {
				assert.equal(error, 'isSame must take another Dateo as an argument');
			}
		});

		it('returns false if passed Dateo is after calling Dateo', function () {
			let dater = new Dateo('2019-02-03')
			let earlier = new Dateo('2019-02-02')
			assert(!dater.isSame(earlier))
		});

		it('returns false if passed Dateo is before calling Dateo', function () {
			let dater = new Dateo('2019-02-03')
			let later = new Dateo('2019-02-02')
			assert(!dater.isSame(later))
		});

		it('returns true if passed Dateo is the same date as calling Dateo', function () {
			let dater = new Dateo('2019-02-03')
			let same = new Dateo('2019-02-03')
			assert(dater.isSame(same))
		});
	});
});