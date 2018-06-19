const Car = require('mongoose').model('Car');

module.exports = {
    getEdit: (req, res) => {
        let targetId = req.params.id;
        Car
            .findById(targetId)
            .then(car => { 
                res.render('cars/edit', car);
            })
            .catch(err => console.log(err.message));
    },

    postEdit: (req, res) => {
        let targetId = req.params.id;
        let make = req.body.make;
        let model = req.body.model;
        let imageUrl = req.body.imageUrl;
        let color = req.body.color;
        Car
            .findById(targetId)
            .then(car => {
                car.make = make;
                car.model = model;
                car.imageUrl = imageUrl;
                car.color = color;
                car.save();
                res.redirect('/cars/all');
            })
            .catch(err => console.log(err.message));   
    }
};