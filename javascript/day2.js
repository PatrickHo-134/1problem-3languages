var { inputDay2 } = require('./input');

function processItem(item){
  let [ policy, password ] = item.replace("\n", "").split(":");
  let char = policy.split(" ")[1];
  let charFrequencies = policy.split(" ")[0].split("-");
  let frequencies = charFrequencies.map(Number);
  
  return [ frequencies, char, password.trim() ];
};

function countCharacter(str, letter){
  let count = 0;

  for (index in str){
    if (str[index] == letter){
      count += 1;
    }
  }

  return count;
};


// PART 1
function checkPassword(passwordEntry){
  let [ minRepeat, maxRepeat ] = passwordEntry[0];
  let character = passwordEntry[1];
  let password = passwordEntry[2];

  if (minRepeat <= countCharacter(password, character)
      && countCharacter(password, character) <= maxRepeat){
        return true;
      } else {
        return false;
      }

};

var processedInput = inputDay2.map(processItem);
let countCorrectPassword = 0;
for (idx in processedInput){
  if (checkPassword(processedInput[idx])){
    countCorrectPassword += 1;
  }
}
console.log(countCorrectPassword);

// PART 2
function appearExactlyOne(passwordEntry){
  let [ firstPos, secondPos ] = passwordEntry[0];
  let character = passwordEntry[1];
  let password = passwordEntry[2];
  if ((password[firstPos-1] == character) && (password[secondPos-1] != character)) {
        return true;
      } else if ((password[firstPos-1] != character) && (password[secondPos-1] == character)) {
        return true;
      } else {
        return false;
      }
};

countCorrectPassword = 0;
for (idx in processedInput){
  if (appearExactlyOne(processedInput[idx])){
    countCorrectPassword += 1;
  }
}
console.log(countCorrectPassword);