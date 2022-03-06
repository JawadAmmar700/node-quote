const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const passport = require("passport")

// dotenv congiguration
require("dotenv").config()

//google strategy
require("./config/google-strategy")

//require monogoose
require("./config/mongoose-connection")

const app = express()

//session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGOOSE_URI,
    }),
  })
)

//parse Json data
app.use(express.json())
// encode form data
app.use(express.urlencoded())

//layout configuration
app.use(expressLayouts)

// passport configuration miiddleware
app.use(passport.initialize())
app.use(passport.session())

//view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

//static folder
app.use(express.static(path.join(__dirname, "public")))

//routes
app.use("/", require("./routes"))
app.use("/auth", require("./routes/auth"))
app.use("/quote", require("./routes/quote"))

const PORT = process.env.PORT || 3000

app.listen(3000, () => console.log(`Server started on port ${PORT}`))
