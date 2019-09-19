const Cube = require('../models/Cube.js');

module.exports = {
    homeGet: (req, res) => {
        //with select get currents properies!
        Cube.find({})
        .select('_id name imageUrl difficulty')
        .sort('difficulty')
        .then((cubes) => {
            res.render('index.hbs', {cubes});
        }).catch(err => console.log(err.message));
    },

    about: (req, res) => {
        res.render('about.hbs');
    },

    search: (req, res) => {
        const name = req.query.name;
        const from = Number(req.query.from);
        const to = Number(req.query.to);
        
        const errors = searchHandleErrors(name, from, to);
        if(errors.length > 0) {
            res.locals.globalError = errors;
        }

        Cube.find({}).then((cubes) => {
            if(name.length) {
                cubes = cubes
                    .filter(c => c.name.toUpperCase() === name.toUpperCase());
            }

            if(from > 0 && from < 7) {
                cubes = cubes
                    .filter(c => c.difficulty >= from);
            }

            if(to > 0 && to < 7) {
                cubes = cubes
                    .filter(c => c.difficulty <= to);
            }

            if(from > to) return;

            cubes = cubes.sort((a,b) => +a.difficulty - +b.difficulty);
            res.render('index.hbs', { cubes });
        }).catch(err => console.log(err.message));
    }
}

function searchHandleErrors(name, from, to) {
    let errors = [];
    if(name.length > 0 && name.length < 3 || name.length > 15)
        errors.unshift("'Name must be between 3 and 15 symbols!");

    if(from !== 0 && from < 1 || from > 6)
        errors.unshift("From must be between 1 and 6 numbers!");

    if(to !== 0 && to < 1 || to > 6)
        errors.unshift("To must be between 1 and 6 numbers!");

    if(from > to && from !== 0 && to !== 0)
        errors.unshift("From must be less from to");

    return errors;
}