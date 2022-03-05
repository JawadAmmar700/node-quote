const mongoose = require("mongoose")
const Schema = mongoose.Schema

const QuoteSchema = new Schema({
  quote: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
})

module.exports = mongoose.model("Quote", QuoteSchema)
