// importing stuff
let ops = require('./operationsHandler.js')

// user-defined variables as a global hash map
var userDefined_vars = {};

// func to handle numbers
let handleNumber = function handleNumber(chunk, cmd) {
    if (chunk.includes('=')){
        let leftSideOfEquition = chunk.substr(0, chunk.indexOf('='))
        let righSideOfEquition = chunk.substr(chunk.indexOf("=") + 1)
        let isOperation = opsDetector(righSideOfEquition, Object.keys(ops)) // if it is an operation
        if ( !isNaN(parseInt(righSideOfEquition)) ) {  // if it is a number
            cmd == "int"
            ? userDefined_vars[leftSideOfEquition] = parseInt(righSideOfEquition)
            : userDefined_vars[leftSideOfEquition] = parseFloat(righSideOfEquition)
        }
        else if( isOperation ) {
            console.log('there is an operation')
            var arguments = righSideOfEquition.match(/\((.*)\)/).pop().split(',')
            if (arguments.length != 2) { // number of arguments should be exactly 2
                arguments.forEach( function(arg, i) {
                    if ( isNaN(arg) ) {
                        if (Object.keys(userDefined_vars).includes(arg)) {
                            // to give the argument the value ut got before by user
                            this[i] = userDefined_vars[arg]
                        }
                        else {
                            console.log('error')
                        }
                    }
                }, arguments);

                switch (isOperation) {
                    case "add":
                        userDefined_vars[leftSideOfEquition] = ops.add(arguments[0],arguments[1])
                        break;
                    case "sub":
                        userDefined_vars[leftSideOfEquition] = ops.sub(arguments[0],arguments[1])
                        break;
                    case "mul":
                        userDefined_vars[leftSideOfEquition] = ops.mul(arguments[0],arguments[1])
                        break;
                    case "div":
                        userDefined_vars[leftSideOfEquition] = ops.div(arguments[0],arguments[1])
                        break;
                    case "pow":
                        userDefined_vars[leftSideOfEquition] = ops.pow(arguments[0],arguments[1])
                        break;   
    
                    default:
                        break;
                }
            }
            else {
                
            }
           
        }
        else {
            // write some error for nothing
        }

    } else {
        userDefined_vars[chunk] = 0; // default is var = 0
    }
    console.log('vars: ',userDefined_vars)
}

// func to find if user has used one the allowed ops
function opsDetector(target, pattern) {
    opt = ""
    target = target.replace(/[()](.*)/g, '')
    pattern.forEach(op => {
        if (target==op) {
            opt = target
        }
    });
    return opt
}

module.exports = {handleNumber: handleNumber}