const express = require("express")
const getAllPublicQuotes = require("../lib/get-all-public-quotes")
const getMyQuotes = require("../lib/get-my-quotes")
const route = express.Router()
const {
  checkIfUserIsLoggedIn,
  preventFromAccessingLoginPage,
} = require("../middleware")
const Quote = require("../models/quote")

route.get("/", preventFromAccessingLoginPage, (req, res) => {
  res.render("pages/login", {
    layout: false,
  })
})

route.get("/dashboard", checkIfUserIsLoggedIn, async (req, res) => {
  const publicQuotes = await getAllPublicQuotes()

  res.render("pages/dashboard", {
    user: req.user.displayName,
    userImage: req.user.photos[0].value,
    quotes: publicQuotes,
    _id: req.user._id,
    title: "Dashboard",
  })
})

route.get("/my-quotes", async (req, res) => {
  const myQuotes = await getMyQuotes({ id: req.user._id })
  res.render("pages/my-quotes", {
    userImage: req.user.photos[0].value,
    myQuotes,
    title: "My Quotes",
  })
})

route.get("/new-quote", (req, res) => {
  res.render("pages/new-quote", {
    userImage: req.user.photos[0].value,
    firstName: req.user.name.givenName,
    lastName: req.user.name.familyName,
    title: "New Quote",
  })
})

route.get("/edit-quote", async (req, res) => {
  const quote = await Quote.findOne({ _id: req.query.id })
  res.render("pages/edit-quote", {
    id: req.query.id,
    userImage: req.user.photos[0].value,
    firstName: quote.firstName,
    lastName: quote.lastName,
    quote: quote.quote,
    isPublic: quote.isPublic,
    title: "Edit Quote",
  })
})

module.exports = route
