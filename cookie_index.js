const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

// app.use(cookieParser()); // use cookieParser as an middleware
app.use(cookieParser('mySecretKey123')); // set signed cookie

app.get('/', (req, res) => {
    var home = `Home Page`;
    // const username = req.cookies.username;
    const username = req.signedCookies.username;
    if(!username) {
        res.send(`${home} : No cookie found!`);
    }

    res.send(`${home} Cookie found: ${username}`);
});

app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'chetan semariya', 
        {
            maxAge : 900000,
            httpOnly: true,
            signed: true // for signed cookie
        }
    )

    res.send('Cookie has been set on the browser');
});

app.get('/get-cookie', (req, res) => {
    const username = req.signedCookies.username; // agar humne signed cookie set kari hai to iss tarah se hi retrieve hogi
    // const username = req.cookies.username; // for reading unsigned cookie
    if(!username) {
        res.send('No cookie found!');
    }

    res.send(`Cookie found: ${username}`);
});

app.get('/delete-cookie', (req, res) => {
    res.clearCookie('username');
    res.send('Cookie has been deleted');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});