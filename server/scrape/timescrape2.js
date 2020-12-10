/* eslint-disable complexity */
// 'DT2H40M'
// 2H40M
// 'P0DT0H15M'
// 0H15M
const timescrape2 = time => {
  if (!time) {
    return ''
  }
  time = time.toString()

  let totalTime =
    time.indexOf('P') !== -1
      ? time.slice(4).toString()
      : time.slice(2).toString()
  let hIndex = totalTime.indexOf('H')
  let mIndex = totalTime.indexOf('M')
  let hour = totalTime.slice(0, hIndex)
  let min = totalTime.slice(hIndex + 1, mIndex)

  let numMin = Number(min)
  let numHour = Number(hour)
  let noHour = false
  let noMin = false
  if (numMin === 0) {
    noMin = true
  }
  if (numHour === 0) {
    noHour = true
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

module.exports = {timescrape2}
