// importing stuff
let ops = require('./operationsHandler.js')

// user-defined variables as a global hash map
var userDefined_vars = {};

// func to handle numbers
let handleNumber = function handleNumber(chunk, cmd) {
    if (chunk.includes('=')){
        let leftSideOfEquition = chunk.substr(0, chunk.indexOf('='))
        let righSideOfEquition = chunk.substr(chunk.indexOf("=") + 1)
        if ( !isNaN(parseInt(righSideOfEquition)) ) {  // if it is a number
            cmd == "int"
            ? userDefined_vars[leftSideOfEquition] = parseInt(righSideOfEquition)
            : userDefined_vars[leftSideOfEquition] = parseFloat(righSideOfEquition)
        } else if( opsDetector(righSideOfEquition, Object.keys(ops))) { // if it is an operation
                console.log('wrks')
        }

    } else {
        userDefined_vars[chunk] = 0; // default is var = 0
    }
    console.log('vars: ',userDefined_vars)
}

// func to find if user has used one the allowed ops
function opsDetector(target, pattern) {
    value = 0
    pattern.forEach(op => {
        if (target.includes(op)) {
            value++
        }
    });
    return value
}

module.exports = {handleNumber: handleNumber}