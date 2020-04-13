//importing stuff
let executionHandler = require('../handlers/executionHandler.js');
let errorHandler = require('../handlers/errorHandler.js'); 

// func to control control statements
let controlStatementController = function controlStatementController(chunkedLine_assignment, reaction) {
    switch (reaction) {
        case "handleForLoop":
            if (chunkedLine_assignment.match(/\((.*)\)/) && chunkedLine_assignment.match(/\{(.*)\}/)) {
                // if it contains statements and operations(curly brackets) then follows
                let loop_statements = chunkedLine_assignment.match(/\(([^)]+)\)/).pop().replace(/\s/g,'')
                
                let loop_operations = chunkedLine_assignment.match(/\{(.*)\}/).pop().replace(/\s/g,'')
                loop_statements = loop_statements.split(';')

                loop_statements.length == 3
                ?   loop_operations.length
                    ? executionHandler.handleForLoop(loop_statements,loop_operations)
                    : errorHandler.CTRLStatementError('operationsLength')   
                :   errorHandler.CTRLStatementError('statementsLength')
            } else {
                errorHandler.CTRLStatementError('statementsDefinition')
            }
            break;
    
        default:
            break;
    }
}

module.exports = {
    controlStatementController: controlStatementController,
}