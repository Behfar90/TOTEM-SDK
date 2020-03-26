
// func to control control statements
let controlStatementController = function controlStatementController(chunkedLine_assignment, chunkedLine_cmd) {
    let f = chunkedLine_cmd + chunkedLine_assignment
    console.log(eval(f))
}

module.exports = {
    controlStatementController: controlStatementController,
}