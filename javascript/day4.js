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

function checkValidPassport(passport, optionalFields){
    let passportFields = Object.keys(passport).sort();
    let missingFields = requiredFields.filter(x => !passportFields.includes(x))
                                      .sort();

    return (JSON.stringify(missingFields) == JSON.stringify(optionalFields.sort()) ||
            JSON.stringify(passportFields) == JSON.stringify(requiredFields.sort()));
}

var passports = inputDay4.map(function(s){if (s == "\n"){ return s } else { return s.replace("\n", "") }})
                         .reduce(function(a,b){ return a + " " + b })
                         .split("\n")
                         .map(function(s){ return s.trim().split(" ") })
                         .map(convertArrayToDictionary);

// PART 1
let validPassportCount = passports.filter(function(p){return checkValidPassport(p, ['cid'])})
                                  .length;
console.log(validPassportCount);
// => 239

// PART 2
function checkYearFields(value, digitNum=4, yearRange=[1920,2002]){
    let year = parseInt(value);
    let [minYear, maxYear] = yearRange;

    if (value.length == digitNum && Number.isInteger(year)){
        return (minYear <= year && year <= maxYear);
    } else { return false }
}

console.log(checkBYR('2003'));