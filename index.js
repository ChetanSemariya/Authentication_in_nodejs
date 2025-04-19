const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./model/user.model');

// Database connection
mongoose.connect("mongodb://127.0.0.1/user-crud")
.then(() => console.log("Connected"));

// Middleware 
app.use(express.urlencoded({extended:false})); // accpet form data
app.use(express.json()); // accept json data for api
app.set("view engine", "ejs");

// set sessions
app.use(session({
    secret : 'secret123',
    resave: false,
    saveUninitialized: false,
}));

// middleware for check user is logged in or not
let checkLogin = (req, res, next) => {
    if(req.session.user) {
        next()
    }else{
        res.redirect('/login');
    }
}

// Routes

// home page
app.get('/', checkLogin, (req, res) => {
    res.send(`<h1>Home Page</h1>
         <p>Hello, ${req.session.user}</p>
         <a href="/logout">Logout</a>
         `);
});

// profile page
app.get('/profile', checkLogin, (req, res) => {
    res.send(`<h1>Profile Page</h1>
         <p>Hello, ${req.session.user}</p>
          <a href="/logout">Logout</a>
         `);
});


app.get('/login', (req, res) => {
    if(req.session.user){
        res.redirect('/')
    }else{
        res.render('login', {error: null});
    }
    // res.render('login', { error: null});
});

app.get('/register', (req, res) => {
    res.render('register', { error: null});
});

// submit register form
app.post('/register', async (req, res) => {
    const { username, userpassword} = req.body // object destructuring
    const hashedPassword = await bcrypt.hash(userpassword, 10) // hash work work as asynchronously

    // res.send({username, userpassword : hashedPassword});
    await User.create({username, userpassword : hashedPassword});
    res.redirect('/login');
});

// submit login route
app.post('/login', async(req, res) => {
    const { username, userpassword} = req.body;

    const user = await User.findOne({username}); // check user email exist or not
    if(!user) return res.render('login', { error : 'User not found'});

    // check for user password
    const isMatch = await bcrypt.compare(userpassword, user.userpassword); // compare method is used to chck the password with the database correct or not
    if(!isMatch) return res.render('login', {error: 'Invalid Password'});

    // save username in session after the authentication
    req.session.user = username

    res.redirect('/');
});

// logout route
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});