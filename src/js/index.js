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
    console.log(ruleLines)
}

// func to process and execute user's code
function getInputValue() {
    var userCodeValue = $("#userCode").val()
    var allCodeValueLines = userCodeValue.split(/\r\n|\n/);
    allCodeValueLines.forEach(userLine => {
        var chunkedLine = userLine.split(" ")
        var reaction = getRuleReaction(chunkedLine[0])
        console.log('reaction: ',reaction)
        // continue
    });
}

// func to search through the commands and return its appropriate reaction
function getRuleReaction(cmdUser) {
    for (let ruleLine of ruleLines) {
        var cmdValue = ruleLine.get("COMMAND")
        if (cmdUser === cmdValue ){
            return ruleLine.get("HOWTOREACT");
        }
    }
    return 'null'
}


