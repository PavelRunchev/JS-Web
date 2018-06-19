
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//Caution never arraw function!!!

//mongoose with Schema!
let CarsSchema = new  mongoose.Schema({
    model: {type: String, required: true, maxlength: 100},
    color: {type: String, required: true, maxlength: 30},
    buy: {type: String, required: true}
});

    //mongoose with model!
let UsersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true, maxlength: 60, minlength: 10}
});

UsersSchema.method.getInfo = function () {
    return 'this is stats for users -> name: ' + this.name + ' age: ' + this.age;
};

UsersSchema.virtual('fullStat').get(function () {
    return this.name + ' ' + this.age;
});

let Cars = mongoose.model('cars', CarsSchema);
let Users = mongoose.model('users', UsersSchema);

mongoose.connect('mongodb://localhost:27017/db')
    .then(() => {
        //return count object of the base
        Users.count().then(console.log);
        
        //read virtual property
        Users.find({_id: '5b13f6fc7c794d24efdb99ec'}).exec().then(u => console.log(u[0].fullStat));

        Users.find({name: 'Stela'}).exec().then(a => console.log(a[0].age));

        Users.find({_id: '5b13f97e8bb69dfd69b11d24'}).then(a => console.log(a[0].name));
        //Users.findOne({age: 33}).then(a => console.log(a));
        Users.update({ name: 'Haralambii' }, { $set: { name: 'Stamat'} }).then(console.log('this user is updated'));
        Users.findById({_id: '5b142e1ce50a980c34de066b'}).then(a => console.log(a.name));
        //find user by age => great 25, little 33
        Users.find({}).where('age').gt(25).lt(33).then(a => console.log(a[0].name));
        //find from the base and sorted
        Users.find({}).sort('-name').then(a => {
            for (let us of a) {
                console.log(us.fullStat);
            }
        });
    });


module.exports = {Users , Cars};
