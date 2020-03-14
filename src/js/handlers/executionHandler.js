// user-defined variables as a global hash map
var userDefined_vars = {};

function handleNumber(chunk, cmd) {
    if (chunk.includes('=')){
        let leftSideOfEquition = chunk.substr(0, chunk.indexOf('='))
        let righSideOfEquition = chunk.substr(chunk.indexOf("=") + 1)
        if ( !isNaN(parseInt(righSideOfEquition)) ) {
            cmd == "int"
            ? userDefined_vars[leftSideOfEquition] = parseInt(righSideOfEquition)
            : userDefined_vars[leftSideOfEquition] = parseFloat(righSideOfEquition)
        } else {
                // if the var is defined or not and computational funcs
                // complete this part later
        }

    } else {
        userDefined_vars[chunk] = 0; // default is var = 0
    }
    console.log('vars: ',userDefined_vars)
}

export {handleNumber}