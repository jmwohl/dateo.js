const REGEX_PARSE = /^(\d{4})-?(\d{2})-?(\d{2})$/
const REGEX_FORMAT = /\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
const weekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_')
const months = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')

const padStart = (string, length, pad) => {
	const s = String(string)
	if (!s || s.length >= length) return string
	return `${Array((length + 1) - s.length).join(pad)}${string}`
}

export class Dateo {
	// constructor expects ISO date string in format YYYY-MM-DD
	constructor (dateString) {
		if (dateString) {
			if (!REGEX_PARSE.test(dateString)) {
				throw new Error('Invalid date string passed, expected format YYYY-MM-DD')
			}
			this.$d = new Date(dateString)
		} else {
			const now = new Date()
			// Here we don't use UTC getters, as this could cause surprises since 'now' should be for the caller.
			// But be aware that setting the internal date this way creates a date in UTC, since we're getting rid
			// of the time portions in this constructor...
			this.$d = new Date(now.getFullYear(), now.getMonth(), now.getDate())
		}
		this.year = this.$d.getUTCFullYear()
		this.month = this.$d.getUTCMonth()
		this.date = this.$d.getUTCDate()
		this.day = this.$d.getUTCDay()

		// make immutable
		Object.freeze(this)
	}

	clone () {
		return new Dateo(this.toString())
	}

	// unit can be 'd', 'w', 'm', 'y'
	add (quantity, unit) {
		const newOD = this.clone()
		switch (unit) {
		case 'd':
			newOD.$d.setUTCDate(this.date + quantity)
			break
		case 'w':
			newOD.$d.setUTCDate(this.date + quantity * 7)
			break
		case 'm':
			// the following ensures add/subtracting months of differing lengths
			// works as expected.
			newOD.$d.setUTCDate(1)
			newOD.$d.setUTCMonth(this.month + quantity)
			newOD.$d.setUTCDate(Math.min(this.date, newOD.daysInMonth()))
			break
		case 'y':
			newOD.$d.setUTCFullYear(this.year + quantity)
		}
		return newOD.clone()
	}

	subtract (quantity, unit) {
		return this.add(quantity * -1, unit)
	}

	startOf (unit) {
		const newOD = new Dateo(this.toString())
		switch (unit) {
		case 'w':
			newOD.$d.setUTCDate(this.date - this.day)
			break
		case 'm':
			newOD.$d.setUTCDate(1)
			break
		case 'y':
			newOD.$d.setUTCMonth(0)
			newOD.$d.setUTCDate(1)
		}
		return newOD.clone()
	}

	endOf (unit) {
		const newOD = this.clone()
		switch (unit) {
		case 'w':
			newOD.$d.setUTCDate(newOD.date - newOD.day + 6)
			break
		case 'm':
			// set to first day of month
			newOD.$d.setUTCDate(1)
			// go to next month
			newOD.$d.setUTCMonth(newOD.month + 1)
			// then step back a day. date is 1-31, so 0 is back one day
			newOD.$d.setUTCDate(0)
			break;
		case 'y':
			newOD.$d.setUTCMonth(11)
			newOD.$d.setUTCDate(31)
		}
		return newOD.clone()
	}

	daysInMonth () {
		const newDO = this.endOf('m')
		return newDO.date
	}

	// Format
	format (formatStr) {
		if (!formatStr) return this.toString()
		const getShort = (index, full, length) => full[index].substr(0, length)
		return formatStr.replace(REGEX_FORMAT, (match) => {
			if (match.indexOf('[') > -1) return match.replace(/\[|\]/g, '')
			switch (match) {
			case 'YY':
				return String(this.year).slice(-2)
			case 'YYYY':
				return String(this.year)
			case 'M':
				return String(this.month + 1)
			case 'MM':
				return padStart(this.month + 1, 2, '0')
			case 'MMM':
				return getShort(this.month, months, 3)
			case 'MMMM':
				return months[this.month]
			case 'D':
				return String(this.date)
			case 'DD':
				return padStart(this.date, 2, '0')
			case 'd':
				return String(this.day)
			case 'dd':
				return getShort(this.day, weekdays, 2)
			case 'ddd':
				return getShort(this.day, weekdays, 3)
			case 'dddd':
				return weekdays[this.day]
			}
		})
	}

	isBefore (dateo) {
		if (!dateo || !(dateo instanceof Dateo)) throw new Error('isBefore must take another Dateo as an argument')
		return this.toString() < dateo.toString()
	}

	isAfter (dateo) {
		if (!dateo || !(dateo instanceof Dateo)) throw new Error('isAfter must take another Dateo as an argument')
		return this.toString() > dateo.toString()
	}

	isSame (dateo) {
		if (!dateo || !(dateo instanceof Dateo)) throw new Error('isSame must take another Dateo as an argument')
		return this.toString() === dateo.toString()
	}

	// Always return ISO string
	toString () {
		return this.$d.toISOString().substr(0, 10)
	}
}

const dateo = (date) => {
	return new Dateo(date)
}

export default dateo
