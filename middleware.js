const User = require("./models/user")

const checkIfUserIsLoggedIn = async (req, res, next) => {
  if (!req.user) return res.redirect("/")
  const user = await User.findOne({ userId: req.user.id })
  req.user._id = user._id
  next()
}

const preventFromAccessingLoginPage = async (req, res, next) => {
  if (!req.isAuthenticated()) return next()
  const user = await User.findOne({ userId: req.user.id })
  req.user._id = user._id
  res.redirect("/dashboard")
}

module.exports = {
  checkIfUserIsLoggedIn,
  preventFromAccessingLoginPage,
}
