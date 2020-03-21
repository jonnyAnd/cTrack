#!/usr/bin/env node
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
var request = require("request")
var dateStr = getDateString();
var fileOutput = "csvFiles/"+dateStr+".csv"

var url = "https://www.bbc.co.uk/indepthtoolkit/data-sets/coronavirus_lookup/json"

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        parseResult(body);
    }
})


function parseResult(fullObjArr){



console.log(dateStr)


    var correctedObj = [];

    for (var i = 0 ; i<fullObjArr.length-1 ; i++){
        var node = fullObjArr[i];

       var locationObj = {};
       locationObj.place = node[1];
       locationObj.cases = node[2];

       correctedObj.push(locationObj);
    }

    csvWriter.writeRecords(correctedObj)
}

function getDateString(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '-' + mm + '-' + yyyy;
    
    return today.toString();
}

const csvWriter = createCsvWriter({
    path: fileOutput,
    header: [
      {id: 'place', title: 'Place'},
      {id: 'cases', title: dateStr},
    ]
  });
