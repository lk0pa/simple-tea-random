const _ = require('lodash');

function random(min, max) {
    return _.random(min, max);
}

module.exports = random;