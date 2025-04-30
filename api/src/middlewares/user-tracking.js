const userTrackingMiddleware = async (req, res, next) => {
  next()

  if (req.ip !== '::1') {
    const userIp = req.ip.replace('::ffff:', '')
    const response = await fetch(`http://ip-api.com/json/${userIp}`)
    const result = await response.json()
    console.log(result)
  }
}

module.exports = userTrackingMiddleware

// // module.exports = async (req, res, next) => {
//   next()

//   try {
//     if (!req.ip || req.ip !== '::1') {
//       const ip = req.ip.replace('::ffff:', '')
//       const response = await fetch(`http://ip-api.com/json/${ip}`)
//       const data = await response.json()
//       console.log(data)
//     }
//   } catch (error) {
//     console.error('Error fetching user tracking data:', error)
//   }
// }
