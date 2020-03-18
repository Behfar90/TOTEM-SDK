// importing stuff
const exactMath = require('exact-math');

module.exports = {

    add: function (a, b) {
        return exactMath.add(a, b)
    },
    sub: function (a, b) {
        return exactMath.sub(a, b)
    },
    mul: function (a, b) {
        return exactMath.mul(a, b)
    },
    div: function (a, b) {
        return exactMath.div(a, b)
    },
    pow: function (a, b) {
        return exactMath.pow(a, b)
    }

}
