// importing stuff
let labelledTypeController = require('../controllers/labelledTypeController.js');

// func to check the cmd type and exec the related controller
let controller = function typeController(chunkedLine_assignment, chunkedLine_cmd, type, reaction) {
    switch (type) {
        case "labelled":
            labelledTypeController.labelledTypeController(chunkedLine_assignment, chunkedLine_cmd, reaction)
            break;
        case "controlStatement":
            controlStatementController()
    
        default:
            break;
    }
}

function controlStatementController() {
    
}

module.exports = {
    controller: controller,
}