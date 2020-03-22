// importing stuff
let ops = require('./operationsHandler.js')
let errorHandler = require('./errorHandler.js')

// user-defined variables as a global hash map
var userDefined_vars = {};

// func to handle numbers
let handleNumber = function handleNumber(chunk, cmd) {
    if (chunk.includes('=')){
        let leftSideOfEquition = chunk.substr(0, chunk.indexOf('='))
        let righSideOfEquition = chunk.substr(chunk.indexOf("=") + 1)
        let isOperation = opsDetector(righSideOfEquition, Object.keys(ops)) // if it is an operation
        let noError = true;
        
        if ( !isNaN(parseInt(righSideOfEquition)) ) {  // if it is a number
            cmd == "int"
            ? userDefined_vars[leftSideOfEquition] = parseInt(righSideOfEquition)
            : userDefined_vars[leftSideOfEquition] = parseFloat(righSideOfEquition)
        }
        else if( isOperation[0] ) {
            console.log('there is an operation')
            var arguments = righSideOfEquition.match(/\((.*)\)/).pop().split(',')
            if (arguments.length == 2) { // number of arguments should be exactly 2
                arguments.forEach( function(arg, i) {
                    if ( isNaN(arg) ) {
                        if (Object.keys(userDefined_vars).includes(arg)) {
                            // to give the argument the value ut got before by user
                            this[i] = userDefined_vars[arg]
                        }
                        else {
                            errorHandler.operationError('undefinedVar',arg)
                            noError = false // to stop the rest from executing
                        }
                    }
                }, arguments);
                // console.log(arguments)
                if (noError) {
                   switch (isOperation[1]) {
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

                    }
                }
                
            }
            else {
                errorHandler.operationError('argNumberError',isOperation[1])
            }
        }
        else {
            // passing the incorrect function name into operation error handler
            errorHandler.operationError('noSuchOperation',isOperation[1])
        }

    } else {
        userDefined_vars[chunk] = 0; // default is var = 0
    }
}

// func to find if user has used one the allowed ops
function opsDetector(target, pattern) {
    opt = false
    funcName = target.replace(/[()](.*)/g, '')
    pattern.forEach(op => {
        if (funcName==op) {
            opt = true
        }
    });
    return [opt,funcName]
}

module.exports = {
    handleNumber: handleNumber,
    userDefined_vars: userDefined_vars
}