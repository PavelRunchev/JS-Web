const Cube = require('../models/Cube');

module.exports = {
    createGet: (req, res) => {
        res.render('cube/create');
    },

    createPost: (req, res) => {
        let cubeBody = req.body;
        cubeBody.difficulty = Number(cubeBody.difficulty);

        Cube.create(cubeBody).then(c => {
            res.redirect('/');
        }).catch(err => handleErrors(err, res, cubeBody));
    },

    details: (req, res) => {
        const cubeId = req.params.id;

        Cube.findOne({ _id: cubeId}).then((cube) => {
            res.render('./cube/details.hbs', cube);
        }).catch(err => console.log(err.message));
    },

    remove: (req, res) => {
        const cubeId = req.params.id;
        console.log(cubeId);
        Cube.deleteOne({ _id: cubeId }).then(() => {
            res.redirect('/');
        }).catch(err => console.log(err.message));
    }
}


function handleErrors(err, res, cubeBody) {
    let errors = [];
    for (const key in err.errors) {
        if(!err.errors[key].message.endsWith('required.'))
            errors.push(err.errors[key].message); 
    }

    res.locals.globalError = errors;
    res.render('cube/create', cubeBody);
}