var { inputDay4 } = require('./input');

function convertArrayToDictionary(arr){
    let dictionary = {}

    for (i in arr){
        let [k,v] = arr[i].split(":");
        dictionary[k] = v;
    }

    return dictionary;
}

function haveRequiredFields(passport, optionalFields){
  let requiredFields = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid' ];
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
let validPassportCount = passports.filter(function(p){return haveRequiredFields(p, ['cid'])})
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

function checkHeight(value){
  let height = parseInt(value);
  let uom = value.replace(/[0-9]/g, '');

  if (uom == "in"){
    return ((59 <= height) && (height <= 76))
  } else if (uom == 'cm') {
    return ((150 <= height) && (height <= 193))
  } else {
    return false
  }
}

function checkHair(s){
  let lowercaseString = s.toLowerCase();
  return (lowercaseString.match(/^#*\d*\w/) != null) &&
         (lowercaseString.match(/[g-z]/) == null) &&
         (lowercaseString.length == 7)
}

function checkEye(value){
  let validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  return validColors.includes(value)
}

function checkPassportID(value){
  return ((value.length == 9) &&
          (value.match(/\d{9}/) != null))
}

function isValidPassport(passport){
  let validBirthYear, validIssueYear, validExpireYear, validHeight, validHair, validEyeColor, validPassportID;

  if (passport['byr']){
    validBirthYear = checkYearFields(passport['byr'], 4, [1920, 2002]);
  } else {validBirthYear = false;}

  if (passport['iyr']){
    validIssueYear = checkYearFields(passport['iyr'], 4, [2010, 2020]);
  } else {validIssueYear = false;}

  if (passport['eyr']){
    validExpireYear = checkYearFields(passport['eyr'], 4, [2020, 2030]);
  } else {validExpireYear = false;}

  if (passport['hgt']){
    validHeight = checkHeight(passport['hgt']);
  } else {validHeight = false;}

  if (passport['hcl']){
    validHair = checkHair(passport['hcl']);
  } else {validHair = false;}

  if (passport['ecl']){
    validEyeColor = checkEye(passport['ecl']);
  } else {validEyeColor = false;}

  if (passport['pid']){
    validPassportID = checkPassportID(passport['pid']);
  } else {validPassportID = false;}

  return (validBirthYear &&
          validIssueYear &&
          validExpireYear &&
          validHeight &&
          validHair &&
          validEyeColor &&
          validPassportID &&
          haveRequiredFields(passport, ['cid']))
}

let validPassportCount2 = passports.filter(function(p){return isValidPassport(p)})
                                   .length;
console.log(validPassportCount2);
// => 188
