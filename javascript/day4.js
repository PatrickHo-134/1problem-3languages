var { inputDay4 } = require('./input');
var assert = require('assert');

var requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    'cid',
];

function convertArrayToDictionary(arr){
    let dictionary = {}

    for (i in arr){
        let [k,v] = arr[i].split(":");
        dictionary[k] = v;
    }

    return dictionary;
}

var passwords = inputDay4.map(function(s){if (s == "\n"){ return s } else { return s.replace("\n", "") }})
                         .reduce(function(a,b){ return a + " " + b })
                         .split("\n")
                         .map(function(s){ return s.trim().split(" ") })
                         .map(convertArrayToDictionary);

console.log(Object.keys(passwords[0]));