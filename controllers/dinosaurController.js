const express = require('express')
const router = express.Router()
const fs = require('fs')

//index route
router.get('/dinosaurs', (req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')  //JSON.parse and stringify
    let dinoData =JSON.parse(dinosaurs) /// you need this in order for the data to render as object that you can display below
    
    console.log(req.query)
    let nameFilter = req.query.nameFilter // go into the query string and grab everything in nameFilter

    if(nameFilter){
    dinoData = dinoData.filter(dino=>{
        return dino.name.toLowerCase() === nameFilter.toLowerCase()   //this compares the query to all dinonames and returns true or false
        })
    }

    res.render('index.ejs', {myDinos: dinoData})
})

router.get('/dinosaurs/new', (req,res)=>{
    res.render('new.ejs')
})


//preparing to edit with form
router.get('/dinosaurs/edit/:idx', (req,res)=>{
    //read in the dinos from the database:
    let dinosaurs = fs.readFileSync('./dinosaurs.json')  
    let dinoData =JSON.parse(dinosaurs)

    let dinoIndex = req.params.idx  
    let targetDino = dinoData[dinoIndex]  //** NEED TO REVIEW THESE STEPS */
//snatch the dino to be updated
res.render('edit.ejs', {dino: targetDino, dinoId: dinoIndex})
})

//put route
router.put('/dinosaurs/:idx', (req,res)=>{
//read into exisiting dino data
let dinosaurs = fs.readFileSync('./dinosaurs.json')  
let dinoData =JSON.parse(dinosaurs)
//replace dino fields with feilds from form
dinoData[req.params.idx].name = req.body.name //this grabs the dino we are editing
dinoData[req.params.idx].type = req.body.type
//write the updated array back to the json file
fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
//console.log(`you edited the dino with index of ${req.params.idx}`)
//once the dino has been edited , do a get request to the index route
res.redirect('/dinosaurs')
})


// show route shows all info about a single dino
// : indicates it is a url paramater, can be accessed with req.params
router.get('/dinosaurs/:idx', (req,res)=>{
//read in the dinos from the database:
let dinosaurs = fs.readFileSync('./dinosaurs.json')  
let dinoData =JSON.parse(dinosaurs)

let dinoIndex = req.params.idx  
let targetDino = dinoData[dinoIndex]  //** NEED TO REVIEW THESE STEPS */

res.render('show.ejs', {dino: targetDino})
console.log(targetDino)  //you need req.params 
})

//post a new dino
router.post('/dinosaurs', (req,res)=>{
//read in the dinos from the database:
let dinosaurs = fs.readFileSync('./dinosaurs.json')  
let dinoData =JSON.parse(dinosaurs)
//add new dino to dinoData array
dinoData.push(req.body)    // look at dinosaurs.json for updated array
//save the dinosaurs to the json file
fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData)) //second argunment is what u want to go into first
//redirect to the index route
//res.redirect take tht url pattern for the get route you want to run next
res.redirect('/dinosaurs')
console.log(req.body)
})

router.delete('/dinosaurs/:idx', (req,res)=> {
console.log(`you're trying to delete dino #${req.params.idx}`)
let dinosaurs = fs.readFileSync('./dinosaurs.json')  
let dinoData =JSON.parse(dinosaurs)
// remove deleted dino from dinoData
dinoData.splice(req.params.idx, 1)

fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

res.redirect('/dinosaurs') // because its not a get route you have to do redirect

})


module.exports = router