const express = require("express")
const route = express.Router()
const Quote = require("../models/quote")

route.post("/add-quote", (req, res) => {
  const { firstName, lastName, quote, appearance } = req.body
  const { _id } = req.user
  const isPublic = appearance
  const newQuote = new Quote({
    quote,
    firstName: firstName,
    lastName: lastName,
    isPublic,
    user: _id,
  })

  try {
    if (!quote) res.status(400).send("Quote is required")
    newQuote.save()
    res.redirect("api/dashboard")
  } catch (err) {
    throw err
  }
})

route.get("/delete/:id", async (req, res) => {
  const { id } = req.params
  await Quote.deleteOne({ _id: id })
  res.redirect("api/my-quotes")
})

route.post("/edit", async (req, res) => {
  const { id } = req.query
  const { quote, firstName, lastName, appearance } = req.body
  await Quote.updateOne(
    { _id: id },
    { quote, firstName, lastName, isPublic: appearance }
  )
  res.redirect("api/my-quotes")
})

module.exports = route
