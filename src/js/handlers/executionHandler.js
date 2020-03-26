// importing stuff
let ops = require('./operationsHandler.js')
let errorHandler = require('./errorHandler.js')

// user-defined variables as a global hash map
var userDefined_vars = {};
// global array to keep track of all executions done by user for TOTEM computation
var TOTEM_executions = []

// not-allowed naming convention
var notAllowedNamingConvention = ['(', ')', '-', '*', '%', '$']

// func to handle numbers
let handleNumber = function handleNumber(chunk, cmd) {
    if (chunk.includes('=')){
        let leftSideOfEquition = chunk.substr(0, chunk.indexOf('='))
        let righSideOfEquition = chunk.substr(chunk.indexOf("=") + 1)
        let isOperation = opsDetector(righSideOfEquition, Object.keys(ops)) // if it is an operation
        let noError = true;
        
        if ( !isNaN(parseInt(righSideOfEquition)) ) {  // if it is a number
            TOTEM_executions.push('assign')
            cmd == "int"
            ? userDefined_vars[leftSideOfEquition] = parseInt(righSideOfEquition)
            : userDefined_vars[leftSideOfEquition] = parseFloat(righSideOfEquition)
        }
        else if( isOperation[0] ) {
            
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
                    TOTEM_executions.push('MathOperation')
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
            notAllowedNamingConvention.some(el => chunk.includes(el))
            ?   errorHandler.namingError(chunk)
            :   userDefined_vars[chunk] = 0; // default is var = 0
                TOTEM_executions.push('assign')
    }
}


// func to handle operations on previously-defined vars
let handleMoreOps = function handleMoreOps(assignment, cmdVar) {
    let plain_assignment = assignment.replace(/\s/g,'');
    let noError = true;
    if (plain_assignment.includes('=')) {
        let righSideOfEquition = plain_assignment.substr(plain_assignment.indexOf("=") + 1)
        let isOperation = opsDetector(righSideOfEquition, Object.keys(ops)) // if it is an operation
        if( isOperation[0] ) {
           
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
                if (noError) {
                    TOTEM_executions.push('MathOperation')
                    switch (isOperation[1]) {
                        case "add":
                            userDefined_vars[cmdVar] = ops.add(arguments[0],arguments[1])
                            break;
                        case "sub":
                            userDefined_vars[cmdVar] = ops.sub(arguments[0],arguments[1])
                            break;
                        case "mul":
                            userDefined_vars[cmdVar] = ops.mul(arguments[0],arguments[1])
                            break;
                        case "div":
                            userDefined_vars[cmdVar] = ops.div(arguments[0],arguments[1])
                            break;
                        case "pow":
                            userDefined_vars[cmdVar] = ops.pow(arguments[0],arguments[1])
                            break;

                    }
                }
                
            }
            else {
                errorHandler.operationError('argNumberError',isOperation[1])
            }
        }
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
    handleMoreOps: handleMoreOps,
    userDefined_vars: userDefined_vars,
    TOTEM_executions: TOTEM_executions
}