const Quote = require("../models/quote")

const getMyQuotes = async ({ id }) => {
  const quotes = await Quote.find({ user: id }).lean().sort({ createdAt: -1 })
  return quotes
}

module.exports = getMyQuotes
