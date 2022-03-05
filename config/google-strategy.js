const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth2").Strategy
const User = require("../models/user")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.HOST}/auth/google/callback`,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const user = new User({
        userId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.emails[0].value,
      })
      try {
        const userExists = await User.findOne({ userId: profile.id })
        !userExists && user.save()
      } catch (error) {
        throw new Error(error.message)
      }
      return done(null, profile)
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})
