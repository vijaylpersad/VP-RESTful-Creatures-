// import packages
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
const fs = require('fs')
const methodOverride = require('method-override')


// middleware
//tell express to use ejs as view engine
app.set('view engine', 'ejs') //(what youre setting up, name of engine) ejs = embedded javascript

app.use(ejsLayouts)

app.use(methodOverride('_method')) //do this above body parser middleware

//body-parser middleware....tells express how to handle payload data...parse it and throw it into request object under body property ~~ req.body
app.use(express.urlencoded({extended: false}))

//controller middelware goes below all other middware

//CONTROLLERS
app.use('/', require('./controllers/dinosaurController.js'))
//app.use('/', require('./controllers/prehistoricController.js'))


//landing page
app.get(('/'), (req,res)=>{
    res.send('hello dinos')
})


//server
app.listen(8000, ()=>{
    console.log('dino crud time')
})