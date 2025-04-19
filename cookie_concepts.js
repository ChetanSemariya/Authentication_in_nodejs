/*

********************** COOKIE ****************************

Cookie :- Temporary information save karana client ke system pr isi ko hum cookie kahte hai. But in sessions we save temporary information on the server that is the main difference between cookie and sessions.

UseCase of Cookie :- 

=> User Authentication
=> shopping cart - save cart information
=> Flash messages
=> Rememeber me/ Auto Login Feature
=> Theme and language preferences (dark mode/Light mode) or Language translation feature website i.e jab bhi user koi language select krta hai to uski preference cookie mai save hojati hai and each page pr vahi language ka content save hota hai user ko
=> Form data Preservation

******************** Working Steps in Cookie *************************

1). npm install cookie-parser
2). const cookieParser = require('cookie-parser');
3). app.use(cookieParser()) // use as a middleware

Note:- cookieParser is used in other way also just like below :-

app.use(cookieParser('secretKey')); // signed cookies 

=> Jab bhi hum user ke system pr cookie save karate hai to user uss cookie mai tempering krskta hai, isse bachne k liye hum cookie mai ek password set kara dete hai jisse vo tempering na krske aise cookie ko signed cookies kahte hai

**************** HOW TO STORE COOKIES *********************** 

res.cookie('key', 'value',
 {
    maxAge : 86400000 (1000 * 60 * 60 * 24) // define cookie life span 
    httpOnly : true, (security purpose se koi or user javascript ka code lagake cookie ko read nahi krskta)
    secure : true, // set true iska mtlb hai jab bhi cookie ko read kiya jayga to uska protocol https hona chahiye it is work on server bcz local system pr humara protocol http hi hota hai
    sameSite : 'strict',  // here strict means koi dusri website aapki cookie ko read na krpaaye. iski 2 or property hoti hai lax/none jab bhi hum sameSite ko define nahi krte hai tab uski property lax hi set hoti hai and jab bhi hum sameSite ko none define krte hai to iska mtlb hai koi or website bhi humari cookie ko read krskti hai 
    signed : true // Bydefault iski value false set hoti hai and agar hum signed cookie ka use krrahe hai to iski value ko true set krna hota hai
});


**************** HOW TO Read COOKIES ***************

res.send(req.cookies.key);

**************** HOW TO delete COOKIES *************

res.clearCookie('key');

*/