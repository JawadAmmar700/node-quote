const mongoose = require("mongoose")

const Mongoose = mongoose.connect(process.env.MONGOOSE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
console.log("connected to mongoose")

module.exports = Mongoose
