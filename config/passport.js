const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
require("dotenv").config();

try {
  var cookieExtractor = function (req) {
    let token;
    if (req) {
      token = req.cookie?.token || req.headers.authorization.split(" ")[1];
    }
    return token;
  };

  let opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      return done(null, payload);
    })
  );
} catch (error) {
  console.log(error);
}

module.exports = passport;
