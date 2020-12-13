const User = require('../db/models/user')

module.exports = async function(userId) {
  try {
    const admin = await User.findOne({
      where: {
        isAdmin: true
      }
    })

    const adminId = admin.dataValues.id

    if (userId === adminId) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
  }
}
