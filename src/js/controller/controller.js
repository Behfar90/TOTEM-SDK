// importing stuff
import { handleNumber } from '../handlers/executionHandler.js';
import { namingErrorHandler } from '../handlers/errorHandler.js';

function typeController(chunkedLine_assignment, chunkedLine_cmd, type, reaction) {
    
    // let chunkedLine_assignment_chunkes = chunkedLine_assignment.split(',')
    //         chunkedLine_assignment_chunkes.forEach(chunk => {
    //             let plain_chunk = chunk.replace(/\s/g,'');
    //             if (isNaN(parseInt(plain_chunk)) && plain_chunk !== "") { // check naming convention
    //                 switch (reaction) {
    //                     case "handleNumber":
    //                         handleNumber(plain_chunk, chunkedLine_cmd);
    //                         break;
                    
    //                     default:
    //                         $('#error').append('There is no defined handler to compile command '+chunkedLine_cmd+'.<br />')
    //                 }
    //             } else {
    //                 namingErrorHandler(plain_chunk)
    //             }
    //         })
}
export {typeController}