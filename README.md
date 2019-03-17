# Dateo.js
A small (≈1kb gzipped), zero-dependency, easy-to-use library for dealing with dates. Only dates. Not times. Not timezones. Just dates.

[![Build Status](https://travis-ci.org/jmwohl/dateo.js.svg?branch=master)](https://travis-ci.org/jmwohl/dateo.js)
[![Coverage Status](https://coveralls.io/repos/github/jmwohl/dateo.js/badge.svg?branch=master)](https://coveralls.io/github/jmwohl/dateo.js?branch=master)

---

## Why?
Your application deals with dates, but doesn't care about times or timezones. You want to add, subtract, compare, and display dates without worrying about where your users are or at what time your date-centric data models get created or read.

E.g. Peter's birthday is on 2012-03-19, no matter when or where you are.

## How?

### The Dateo class
The Dateo class constructor expects an ISO-formatted date string to set a specific date. You can always use the `dateo()` convenience function to generate
new Dateo instances:

```javascript
const date = new Dateo('2019-03-12')
// or equivalently
const date = dateo('2019-03-12')
```

Or leaving the constructor blank creates a new dateo instance with today's (via the caller's system) date:

```javascript
const date = new Dateo()
// or equivalently
const date = dateo()
```

### Manipulation
With that dateo instance you can add or subtract days, weeks, months, or years. **Dateo objects are immutable, so all instance methods return a
new instance with the specified modifations.**

#### Add or Subtract days, weeks, months, or years
The signature for `add` and `subtract` is the same: `(quantity, unit)`, where quantity is an integer and unit is a single-character string, 'd', 'w', 'm', or 'y'.

```javascript
const date = dateo('2019-03-12')
const newDate = date.add(3, 'd')
console.log(newDate.toString()) // '2019-03-15'

const aWeekLater = date.add(1, 'w')
console.log(aWeekLater.toString()) // '2019-03-22'

const aMonthEarlier = aWeekLater.subtract(1, 'm')
console.log(aMonthEarlier.toString()) // '2019-02-22'

const twoYearsHence = aMonthEarlier.add(2, 'y')
console.log(twoYearsHence.toString()) // '2021-02-22'
```

#### Start or End of a week, month, or year
You can also get the start or end of a given time period for a date. You can specify units of 'w', 'm', or 'y'. Dateo considers Sunday to be the week's start, and Saturday to be the week's end.

For example, you might want to know what date was the start of a given dates week:

```javascript
const date = dateo('2019-03-12')
const weekStart = date.startOf('w')
console.log(weekStart.toString()) // '2019-03-10'

const weekEnd = date.endOf('w')
console.log(weekEnd.toString()) // '2019-03-16'
```

### Comparison
A common situation is the need to compare two dates to know if one date is before, after, or the same as another.

The `isBefore`, `isAfter`, and `isSame` methods all have the same signature, taking another Dateo instance as their only argument, and all either return `true` or `false`.

```javascript
const date = dateo('2019-03-12')
const aLaterDate = dateo('2019-03-13')
console.log(date.isBefore(aLaterDate)) // true

const anEarlierDate = dateo('2019-03-11')
console.log(date.isBefore(anEarlierDate)) // false
```

### Display
Finally, you can format your date using some familiar formatting strings.

```javascript
const date = dateo('2019-03-05')
console.log(date.format()) // '2019-03-05'
console.log(date.format('YY')) // '19'
console.log(date.format('YYYY')) // '2019'
console.log(date.format('M')) // '3'
console.log(date.format('MM')) // '03'
console.log(date.format('MMM')) // 'Mar'
console.log(date.format('MMMM')) // 'March'
console.log(date.format('D')) // '5'
console.log(date.format('DD')) // '05'
console.log(date.format('d')) // '2' (this is the day of the week, 0-6)
console.log(date.format('dd')) // 'Tu'
console.log(date.format('ddd')) // 'Tue'
console.log(date.format('dddd')) // 'Tuesday'
console.log(date.format('MMM D')) // 'Mar 5'
console.log(date.format('MM/DD/YYYY')) // '03/05/2019'
console.log(date.format('[MM] MM/DD/YYYY')) // 'MM 03/05/2019' (brackets escape formatting strings)
```

The `toString` method outputs the ISO date string (YYYY-MM-DD).
```javascript
const date = dateo('2019-03-05')
console.log(date.toString()) // '2019-03-05'
```
