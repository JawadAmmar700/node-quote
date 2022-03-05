const express = require("express")
const passport = require("passport")
const route = express.Router()

route.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
)

route.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "api/auth/google/success",
    failureRedirect: "api/auth/google/failure",
  })
)

route.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/api")
})

route.get("/google/success", (req, res) => {
  res.redirect("api/dashboard")
})
route.get("/google/failure", (req, res) => {
  res.send("failure")
})

module.exports = route
