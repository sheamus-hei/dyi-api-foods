const express = require('express');
const app = express();
const db = require('./models');

app.use(express.urlencoded({ extended: false }));

//API to query for foods

// Route 1 show all foods - GET
app.get('/foods', (req, res) => {
    db.food.findAll().then(function(foods) {
        res.json(foods);
    }).catch(err => {
        console.log(err);
        res.send("Error occured");
    });
});

// Route 1 one food
app.get('/foods/:id', (req, res) => {
    db.food.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(food) {
        console.log('Found this food:', food.name);
        res.send('Found this food: ' + food.name);
    }).catch(err => {
        console.log(err);
        res.send("Error occured");
    });
});

// Route 3 create new food - POST
app.post('/foods', (req, res) => {
    console.log(req.body);
    db.food.findOrCreate({
        where: {
            name: req.body.name
        },
        defaults: {
            type: req.body.type,
            nutrients: req.body.nutrients,
            color: req.body.color
        }
    }).then(function([food, created]) {
        console.log(`Cooked up a${created? ' created': 'n already created'} ${food.lastName}`);
        res.redirect(`/foods/${food.id}`);
    }).catch(err => {
        console.log(err);
        res.send("Error occured");
    });
});

// Route 4 update existing food - PUT
app.put('/foods/:id', (req, res) => {
    // res.send("update food at id" + req.params.id);
    db.food.update({
        name: req.body.name,
        type: req.body.type,
        nutrients: req.body.nutrients,
        color: req.body.color 
    }, { 
        where: {
            id: req.params.id
        }
   }).then(function(updated) {
       if (updated) {
           console.log("Successfully updated");
       }
       res.redirect('/foods');
   }).catch(err => console.log(err));
});

// Route 5 eat food - DELETE
app.delete('/foods/:id', (req, res) => {
    // res.send("Delete food at id" + req.params.id);
    db.food.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(deletedFood) {
        console.log("ate the", deletedFood);
        res.send('ate a food');
    }).catch(err => console.log(err));
}); 

app.listen(3000, () => console.log('🍳 Cooking up some foods 🍳'));