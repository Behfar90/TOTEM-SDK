// making user-readable error if command is not right
function commandErrorHandler(cmd) {
    // this line should shows <-- in the text area
    cmd.length
    ? $('#error').append('Command '+cmd+' is not defined/allowed.<br />')
    : $('#error').append('Command is not completed.<br />')
  }

  // making user-readable error if var name is against naming convention
  function namingErrorHandler(assignment) {
    assignment.includes('=')
    ? $('#error').append('Variable name '+assignment.substr(0, assignment.indexOf('='))+' is not allowed.<br />')
    : $('#error').append('Variable name '+assignment+' is not allowed/defined.<br />')
  }

export {commandErrorHandler, namingErrorHandler}