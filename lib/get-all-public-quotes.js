const Quote = require("../models/quote")
const moment = require("moment")

const getAllPublicQuotes = async () => {
  const quotes = await Quote.find({ isPublic: true })
    .lean()
    .sort({ createdAt: -1 })

  const allQuotes = quotes.map(quote => {
    return {
      ...quote,
      time: moment().from(quote.createdAt).replace("in", " "),
    }
  })

  return allQuotes
}

module.exports = getAllPublicQuotes
