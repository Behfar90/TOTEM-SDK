//importing stuff
let executionHandler = require('../handlers/executionHandler.js');
let errorHandler = require('../handlers/errorHandler.js'); 

// func to control control statements
let controlStatementController = function controlStatementController(chunkedLine_assignment, reaction) {
    switch (reaction) {
        case "handleForLoop":
            if (chunkedLine_assignment.match(/\((.*)\)/)) {
                let loop_statements = chunkedLine_assignment.match(/\((.*)\)/).pop().replace(/\s/g,'')
                loop_statements = loop_statements.split(';')
                if (loop_statements.length == 3) {
                    let loopDefinition = loop_statements[0]
                    executionHandler.handleNumber(loopDefinition,"int")    
                } else {
                    errorHandler.CTRLStatementError('statementsLength')
                }
            } else {
                errorHandler.CTRLStatementError('statementsDefinition')
            }
            break;
    
        default:
            break;
    }
    
    // executionHandler.handleForLoop()
}

module.exports = {
    controlStatementController: controlStatementController,
}