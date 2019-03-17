let assert = require('assert');

import { Dateo } from '../src/index.js'
import dateo from '../src/index.js'
// const Dateo = require('../src/index.js');

describe('Dateo', function () {
	describe('format', function () {
		it('allows formatting based on standard strings', function () {
			// const date = new Dateo('2019-03-12')
			const date = dateo('2019-03-12')
			assert(date instanceof Dateo)
			assert.equal(date.format(), '2019-03-12')
			assert.equal(date.format('YY'), '19')
			assert.equal(date.format('YYYY'), '2019')
			assert.equal(date.format('M'), '3')
			assert.equal(date.format('MM'), '03')
			assert.equal(date.format('MMM'), 'Mar')
			assert.equal(date.format('MMMM'), 'March')
			assert.equal(date.format('D'), '12')
			assert.equal(date.format('DD'), '12')
			assert.equal(date.format('d'), '2')
			assert.equal(date.format('dd'), 'Tu')
			assert.equal(date.format('ddd'), 'Tue')
			assert.equal(date.format('dddd'), 'Tuesday')
			assert.equal(date.format('MMM D'), 'Mar 12')
			assert.equal(date.format('MM/DD/YYYY'), '03/12/2019')
			assert.equal(date.format('[MM] MM/DD/YYYY'), 'MM 03/12/2019')
		});
	});
});