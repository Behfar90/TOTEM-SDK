// importing stuff
let errorHandler = require('./handlers/errorHandler.js');
let controller = require('./controllers/controller.js');
let executionHandler = require('./handlers/executionHandler.js')
var $ = require('jquery')

// Global variables
var ruleLines = new Array(); //variable to keep rules
var globalVars = executionHandler.userDefined_vars //global vars defined by user
var operators = executionHandler.TOTEM_operators //global array of executions done by user
var mapped_executions = executionHandler.mapped_executions //global array of mapped executions of user's code

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "./rules/rules.csv",
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
            var ruleMap = new Map();
            for (var j=0; j<headers.length; j++) {
                ruleMap.set(headers[j],data[j])
            }
            ruleLines.push(ruleMap);
        }
    }
    console.log('Rules:',ruleLines) // just to see rules at console
}

// func to search through the commands and return its appropriate reaction and type
function getRuleValues(cmdUser, key) {
    for (let ruleLine of ruleLines) {
        var cmdValue = ruleLine.get("COMMAND")
        if (cmdUser === cmdValue ){
            return ruleLine.get(key);
        }
    }
    return false
}

//func to read and pass each line to the controller if there is a reaction
let lineReader = function lineReader(userLine) {
    var chunkedLine_cmd = userLine.substr(0,userLine.indexOf(' '));
    var chunkedLine_assignment = userLine.substr(userLine.indexOf(' ')+1);
    var reaction = getRuleValues(chunkedLine_cmd,"HOWTOREACT")
    var type = getRuleValues(chunkedLine_cmd,"CMDTYPE")

    var isVar = Object.keys(globalVars).includes(chunkedLine_cmd)
    if (type) {
        console.log('Type:',type,', Reaction:',reaction)
    }
    // continue
    reaction
       ? controller.controller(chunkedLine_assignment, chunkedLine_cmd, type, reaction)
       : isVar
            ? executionHandler.handleMoreOps(chunkedLine_assignment, chunkedLine_cmd)
            : errorHandler.commandError(chunkedLine_cmd)
}



// func to process and execute user's code
document.querySelector('button').addEventListener("click", function (){
    exports.lineReader = lineReader
    
    var userCodeValue = $("#userCode").val()
    var allCodeValueLines = userCodeValue.split(/\r\n|\n/);
    let loopLine = []
    allCodeValueLines.forEach(function(line, index) {
        if (line.substr(0,line.indexOf(' ')) == 'for') {
            loopLine.push(index)
        }
        if (loopLine.length && line.includes('}')) {
            loopLine.push(index)
        }
        if (loopLine.length > 1) {
            while (allCodeValueLines[loopLine[0] + 1]){
                allCodeValueLines[loopLine[0]] += allCodeValueLines[loopLine[0]+1]
                if (allCodeValueLines[loopLine[0] + 2]) {
                    allCodeValueLines[loopLine[0]] += ";"
                }
                allCodeValueLines.splice(loopLine[0] + 1, 1);
            }
        }
    });
    allCodeValueLines.forEach(userLine => {
        lineReader(userLine)
    });

    console.log('vars:',globalVars)
    console.log('operators:',operators)
    console.log('mapped executions:',mapped_executions)
})
