// importing stuff
import { commandErrorHandler } from './handlers/errorHandler.js';
import { handleNumber } from './handlers/executionHandler.js';

// Global variables
var ruleLines = new Array(); //variable to keep rules

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "rules.csv",
        dataType: "text",
        success: function(data) {processRules(data);}
     });
});

// func to process the rules file
function processRules(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var tarr = new Map();
            for (var j=0; j<headers.length; j++) {
                tarr.set(headers[j],data[j])
            }
            ruleLines.push(tarr);
        }
    }
    console.log(ruleLines) // just to see rules at console
}

// func to process and execute user's code
document.querySelector('button').addEventListener("click", function (){
    var userCodeValue = $("#userCode").val()
    var allCodeValueLines = userCodeValue.split(/\r\n|\n/);
    allCodeValueLines.forEach(userLine => {
        var chunkedLine_cmd = userLine.substr(0,userLine.indexOf(' '));
        var chunkedLine_assignment = userLine.substr(userLine.indexOf(' ')+1);
        var reaction = getRuleReaction(chunkedLine_cmd)
        // continue
        if (reaction) {
            let chunkedLine_assignment_chunkes = chunkedLine_assignment.split(',')
            chunkedLine_assignment_chunkes.forEach(chunk => {
                let plain_chunk = chunk.replace(/\s/g,'');
                switch (reaction) {
                    case "handleNumber":
                        handleNumber(plain_chunk);
                        break;
                
                    default:
                        //should throw error that is not defined
                }
                // console.log( typeof chunk.trim())
            })
        } else {
            commandErrorHandler(chunkedLine_cmd)
        }
    });
})

// func to search through the commands and return its appropriate reaction
function getRuleReaction(cmdUser) {
    for (let ruleLine of ruleLines) {
        var cmdValue = ruleLine.get("COMMAND")
        if (cmdUser === cmdValue ){
            return ruleLine.get("HOWTOREACT");
        }
    }
    return false
}


