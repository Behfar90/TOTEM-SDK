var $ = require('jquery') //importing jquery

// making user-readable error if command is not right
let commandError = function commandErrorHandler(cmd) {
    // this line should shows <-- in the text area
    cmd.length
    ? $('#error').append('Command '+cmd+' is not defined/allowed.<br />')
    : $('#error').append('Command is not completed.<br />')
  }

  // making user-readable error if var name is against naming convention
  let namingError = function namingErrorHandler(assignment) {
    assignment.includes('=')
    ? $('#error').append('Variable name '+assignment.substr(0, assignment.indexOf('='))+' is not allowed.<br />')
    : $('#error').append('Variable name '+assignment+' is not allowed/defined.<br />')
  }

  // throwing error if anything not allowed or incorrect happens during operation functions
  let operationError = function operationErrorHandler(errorType, name) {
    switch (errorType) {
      case 'argNumberError':
        $('#error').append('There must be 2 arguments in operating functions.<br />')
        break
      case 'noSuchOperation':
        $('#error').append('The function ' + name + ' is not defined.<br />')
        break;
      case 'undefinedVar':  
        $('#error').append('Variable ' + name + ' is not defined.<br />')
        break;
    }
  }



module.exports = {
    commandError: commandError,
    namingError: namingError,
    operationError: operationError
}
