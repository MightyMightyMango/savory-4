/* eslint-disable complexity */
const timescrape3 = time => {
  if (!time) {
    return ''
  }
  let totalTime = time.slice(2).toString()
  let min =
    totalTime.length < 3
      ? Number(totalTime.slice(0, 1))
      : Number(totalTime.slice(0, 2))
  let hours
  if (min > 60) {
    hours = Math.floor(min / 60)
    min = min % 60
    return `${hours} hours, ${min} minutes`
  } else {
    return `${min} minutes`
  }
}
console.log(timescrape3('PT9M'))

module.exports = {timescrape3}
