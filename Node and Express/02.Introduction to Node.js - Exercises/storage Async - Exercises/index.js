let data = require('./storage');

data.put('first','firstValue');

data.put('second','secondValue');

data.put('third','thirdValue');

data.put('fouth','fourthValue');

console.log(data.get('first'));

console.log(data.getAll());

data.delete('second');

data.update('first','updatedFirst');

data.save();

data.clear();

console.log(data.getAll());

data.load().then( () => {
    console.log(data.getAll());
});

