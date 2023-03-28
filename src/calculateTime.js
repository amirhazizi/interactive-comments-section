const calculateTime = (createAtTime) => {
  const nowDate = new Date().getTime() - createAtTime
  const oneYear = 365 * 24 * 60 * 60 * 1000
  const oneMonth = 30 * 24 * 60 * 60 * 1000
  const oneWeek = 7 * 24 * 60 * 60 * 1000
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinue = 60 * 1000
  let time = Math.floor(nowDate / oneYear)
  if (time > 0) {
    return `${time} year ago`
  }
  time = Math.floor(nowDate / oneMonth)
  if (time > 0) {
    return `${time} month ago`
  }
  time = Math.floor(nowDate / oneWeek)
  if (time > 0) {
    return `${time} week ago`
  }
  time = Math.floor(nowDate / oneDay)
  if (time > 0) {
    return `${time} day ago`
  }
  time = Math.floor(nowDate / oneHour)
  if (time > 0) {
    return `${time} hour ago`
  }
  time = Math.floor(nowDate / oneMinue)
  if (time > 0) {
    return `${time} minute ago`
  }
  time = Math.floor(nowDate / 1000)
  if (time > 0) {
    return `${time} second ago`
  }
  return "just now"
}
export default calculateTime
