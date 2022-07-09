const FacebookStrategy = require("passport-facebook").Strategy
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy({
    clientID:'400036618692908',
    clientSecret: 'db7a424d1ac6fef00f87032a799f1347',
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, done) {
    
    return done(null, profile)
}
));
passport.serializeUser(function(user,done){
  done(null,user);
})
passport.deserializeUser(function(user,done){
  done(null,user);
}) 


app.get('/', (req, res) => {
    res.send('<a href="/auth/facebook">Authenticate with facebookkkkk</a>');
  });

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');

  });
  app.get('/home',(req,res)=>{
    res.send(`Hello ${req.user.displayName}`);
      console.log(req)
  })
  app.get('/secrets', (req, res) => {
    res.send('Failed to authenticate..');
  });



  app.listen(3000, () => console.log('listening on port: 3000'));
