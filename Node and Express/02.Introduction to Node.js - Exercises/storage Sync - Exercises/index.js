let data = require('./db');

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

data.load();

console.log(data.getAll());




