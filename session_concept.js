/*

// ******** sessions ************ //

Benifits:- Temporary data storage 

*********** Why we use sessions ***************
=> User Authentication
=> Shopping Cart
=> Flash Messages
=> Multi-step forms
=> Temporary Data Storage
=> User Preferences i.e language change krke data show kara skte hai kisi bhi page pr with the help of sessions   
=> Form Data preservation i.e agar error aa jaye to form data ko save krne k liye jisse double se form na bharne pade
=> CAPTCHA Verification

************* How to use sessions in express js ****************

Step-1 :- npm install express-session
Step-2 :- const session = require('express-session');
Step-3 :- set session with the help of middleware

app.user(session({
    secret : 'mysecretkey', // yhh secret key user ki cookie mai save hogi encrypted form mai and isi ke behalf pr session ka data save hota hai and isi key ke behalf pr user authenticate hota hai
    resave : false, //  iska mtlb hai hum sessions mai modification krskte hai ya nahi bydefault ise hum false hi rakhte hai bcz hum sessions mai bahut kam hi modification krte hai most of the time we use read and delete and update
    saveUninitialized : false, // iska mtlb hai ki agar session mai koi bhi data nahi hai to session create nahi hoga
    cookie : { maxAge : 1000 * 60 * 60 * 24 } // session cookie expiration time 24 hrs
}))

******************** Session Commands ***********************

1). Store Session :-

    req.session.key = 'value';

2). Read Session :-

    res.send(req.session.key);

3). Delete Session :-

    req.session.destroy()


Note:- By default session ko hum user ki ram mai store karate hai in the form of cookies but this create an problem if number of guests are very high so in that case we save our session data in backend and for that we use a package named as connect-mongo

*/