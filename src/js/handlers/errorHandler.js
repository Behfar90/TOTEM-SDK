function commandErrorHandler(cmd) {
    // this line should shows <-- in the text area
    $('#error').append('Command '+cmd+' is not defined or allowed.\n')
  }
export {commandErrorHandler}