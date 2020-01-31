// app.js
const express       = require('express')
const app           = express()
const path          = require('path') 
const hbs           = require('hbs')
const bodyParser    = require('body-parser'); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));


// Query String Parameters | A Form with GET
// Step 1 | Display a Form
app.get('/get-user-info', (req, res) => {
    res.render('user-info-form');
  });

// Step 2 | Use the Query Params
app.get('/display-user-info', (req, res) => {
    let name = req.query.name;
    let age = req.query.age;
    let superhero = req.query.superhero;

    res.send(`
        Your name is ${name}
        Your age is ${age}
        Your favorite superhero is ${superhero}
    `)
});


// Form Params | Making our first POST
// Step 1 | Display a Form
app.get('/login', (req, res) => {
    res.render('login')
  });

// Step 2 | POST route
app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if ( email == 'ironhacker@gmail.com' && password == 'password') {
        res.send(`Welcome`)
        return;
    }
    res.send(`Go away!`)    
})


// Middleware
app.use(myFakeMiddleware)

function myFakeMiddleware(req, _, next){
    console.log("myFakeMiddleware was called!");
    req.secretValue = "swordfish";
    next();
}

app.get('/test', (req, res) => {
  let mySecret = req.secretValue;
  res.send(mySecret);
});
  




app.listen(3000, () => console.log('App listening on port 3000!'))

