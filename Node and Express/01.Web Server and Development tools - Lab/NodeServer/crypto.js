const crypto = require('crypto');

function generateSalt () {
    return crypto.randomBytes(128).toString('base64');
}

function generateHash(salt, pwd) {
    let hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}

const salt = 'eYV5FykmaTucCv3inityKBmY+Lz35V9y2cTGys4QujoyA+uLWDsPSHJbhFEXMACSWSaDdjFxjVM1JYcFDI437uGJKGAXRYM6KplIYX1Y0SEp1DO/Bqk8HgGqApV/9jzloq1ODFjqt2tZGNl7EbXkAy97dEAlTkpaAYjCK6c287o=';
const password = 'pesho123';

const hashed = generateHash(salt, password);

console.log(hashed);
//example
//b2e165ab27ea48a47d5f41ba4f9aff1b3b8cfc53