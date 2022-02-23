const express = require('express')
const router = express.Router()
const fs = require('fs')


//index route
router.get('/prehistoric_creatures', (req,res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')  //JSON.parse and stringify
    let creatureData =JSON.parse(prehistoric_creatures) /// you need this in order for the data to render as object that you can display below
    res.render('creature.ejs', {myCreatures: creatureData})
})

// /prehistoric_creatures/new
router.get('/prehistoric_creatures/new', (req,res)=>{
    res.render('newcreature.ejs')
})


//post a new creature
router.post('/prehistoric_creatures', (req,res)=>{
    //read in the dinos from the database:
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')  //JSON.parse and stringify
    let creatureData =JSON.parse(prehistoric_creatures) /// you need this in order for the data to render as object that you can display below
    //add new dino to dinoData array
    creatureData.push(req.body)    // look at dinosaurs.json for updated array
    //save the dinosaurs to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData)) //second argunment is what u want to go into first
    //redirect to the index route
    //res.redirect take tht url pattern for the get route you want to run next
    res.redirect('/prehistoric_creatures')
    console.log(req.body)
})

//preparing to edit with form --prehistoric creatures
router.get('/prehistoric_creatures/edit/:idx', (req,res)=>{
    //read in the dinos from the database:
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')  //JSON.parse and stringify
    let creatureData =JSON.parse(prehistoric_creatures)

    let creatureIndex = req.params.idx  
    let targetCreature = creatureData[creatureIndex]  //** NEED TO REVIEW THESE STEPS */
//snatch the dino to be updated
res.render('editcreature.ejs', {creature: targetCreature, creatureId: creatureIndex})
})

//put route -- prehistoric creatures to upload edit 
router.put('/prehistoric_creatures/:idx', (req,res)=>{
    //read in the dinos from the database:
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')  //JSON.parse and stringify
    let creatureData =JSON.parse(prehistoric_creatures)
//replace dino fields with feilds from form
creatureData[req.params.idx].type = req.body.type //this grabs the dino we are editing
creatureData[req.params.idx].img_url = req.body.img_url
//write the updated array back to the json file
fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
//console.log(`you edited the dino with index of ${req.params.idx}`)
//once the dino has been edited , do a get request to the index route
res.redirect('/prehistoric_creatures')
})

//display edit updates
router.get('/prehistoric_creatures/:id', (req,res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')  //JSON.parse and stringify
    let creatureData =JSON.parse(prehistoric_creatures) /// you need this in order for the data to render as object that you can display below
    
    let creatureIndex = req.params.id
    let targetCreature = creatureData[creatureIndex]
    
    res.render('creature_show.ejs', {creature: targetCreature})
})

//create a delete for prehistoric creatures
router.delete('/prehistoric_creatures/:idx', (req,res)=> {
    console.log(`you're trying to delete dino #${req.params.idx}`)
    let creatures = fs.readFileSync('./prehistoric_creatures.json')  
    let creatureData =JSON.parse(creatures)
    // remove deleted dino from dinoData
    creatureData.splice(req.params.idx, 1)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    res.redirect('/prehistoric_creatures') // because its not a get route you have to do redirect

})


module.export = router