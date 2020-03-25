// importing stuff
let executionHandler = require('../handlers/executionHandler.js');
let errorHandler = require('../handlers/errorHandler.js');

// func to control labelled type variables
let labelledTypeController = function labelledTypeController(chunkedLine_assignment, chunkedLine_cmd, reaction) {
    let chunkedLine_assignment_chunkes = chunkedLine_assignment.split(/\s*,\s*(?![^(]*\))/)
            chunkedLine_assignment_chunkes.forEach(chunk => {
                let plain_chunk = chunk.replace(/\s/g,'');
                if (isNaN(parseInt(plain_chunk)) && plain_chunk !== "") { // check naming convention
                    switch (reaction) {
                        case "handleNumber":
                            executionHandler.handleNumber(plain_chunk, chunkedLine_cmd);
                            break;
                        // place to handle future defined labelled type variables
                        default:
                            $('#error').append('There is no defined handler to compile command '+chunkedLine_cmd+'.<br />')
                    }
                } else {
                    errorHandler.namingError(plain_chunk)
                }
            })
}

module.exports = {
    labelledTypeController: labelledTypeController,
}