const { ObjectID, ObjectId } = require('bson');

module.exports = function(app, passport, db) {

// normal routes ===============================================================
    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') })    });

    // PROFILE SECTION =========================
    app.get('/contacts', function(req, res) {
        db.collection('contacts').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('contacts.ejs', {
            user : req.user,
            contacts: result,
          })
        })
    });
    
    app.get('/phonebook', function(req, res) {
        db.collection('contacts').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('phonebook.ejs', {
            user : req.user,
            contacts: result,
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/contacts', isLoggedIn, (req, res) => {
      db.collection('contacts').insertOne({user: req.user.local.first, first: req.body.first, last: req.body.last, number: req.body.number, email: req.body.email, method: 'new'}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        setTimeout(() => {res.redirect('/contacts')}, 1000)
      })
    })

    app.post('/phonebook', isLoggedIn, (req, res) => {
        db.collection('contacts').insertOne({user: req.user.local.first, first: req.body.first, last: req.body.last, number: req.body.number, email: req.body.email, method: 'copy'}, (err, result) => {
          if (err) return console.log(err)
          console.log('saved to database')
          setTimeout(() => {res.redirect('/phonebook')}, 1000)
        })
    })

    app.delete('/contacts', isLoggedIn, (req, res) => { 
        db.collection('contacts').findOneAndDelete({user: req.body.user, first: req.body.first, last: req.body.last}, (err, result) => {
            if (err) return res.send(500, err)
            res.send('Message deleted!')
        })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/contacts', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/contacts', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next(null, true);

    res.redirect('/contacts');
}
