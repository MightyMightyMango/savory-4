/* eslint-disable complexity */
const timescrape = time => {
  if (!time) {
    return ''
  }
  let totalTime = time.slice(2).toString()
  if (totalTime.indexOf('D') !== -1) {
    return totalTime
  }
  let min = totalTime.slice(3, 5)
  let hour = totalTime.slice(0, 2)
  let splitMin = min.split('')
  let splitHour = hour.split('')
  let noHour = false
  let noMin = false
  if (splitMin[0] === '0') {
    if (splitMin[1] === '0') {
      noMin = true
    } else {
      min = splitMin[1]
    }
  }
  if (splitHour[0] === '0') {
    if (splitHour[1] === '0') {
      noHour = true
    } else {
      hour = splitHour[1]
    }
  }
  if (noHour && noMin) {
    return ''
  }
  if (noHour) {
    return `${min} minutes`
  }
  if (noMin) {
    return `${hour} hours`
  } else return `${hour} hours, ${min} minutes`
}

module.exports = {timescrape}
