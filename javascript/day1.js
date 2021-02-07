var { inputDay1 } = require('./input');

function BinarySearch(collection, value){
    let first = 0;
    let last = collection.length - 1;
    let index = -1;

    while (first <= last && index == -1){
        let mid = Math.floor((first + last) / 2);
        if (collection[mid] == value){
            index = mid;
        } else {
            if (collection[mid] < value){
                first = mid + 1;
            } else {
                last = mid - 1;
            }
        }
    };

    return index;
};

// PART 1
function findValuePairBySum(collection, sum){
    // Be aware that by default, the sort() method sorts the values as strings 
    // in alphabetical and ascending order.
    let sortedInput = collection.sort(function(a, b){return a-b});
    let valuePair = [];

    for (i = 0; i < (sortedInput.length - 1); i++){
        let firstValue = sortedInput[i];
        let valueToFind = sum - firstValue;
        let searchList = sortedInput.slice(i+1);

        let resultIndex = BinarySearch(searchList, valueToFind);

        if (resultIndex != -1){
            valuePair = [firstValue, searchList[resultIndex]];
            break;
        }
    }

    return valuePair;
};

var resultPart1 = findValuePairBySum(inputDay1, 2020);
console.log(resultPart1[0] * resultPart1[1]);

// PART 2
function findTrioBySum(collection, sum){
    let sortedInput = collection.sort(function(a, b){return a-b});
    let result = [];

    // NOTE: why can't we use i in this for loop?
    // If we do that, the variable i within the child function is bound to the same variable 
    // of the parent function.
    // https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
    for (j = 0; j < (sortedInput.length - 2); j++){
        let firstNum = sortedInput[j];
        let target = sum - firstNum;
        let valuePair = findValuePairBySum(sortedInput.slice(j+1,), target);

        if (valuePair.length === 2){
            result = valuePair.concat([firstNum]);
            break;
        }
    };

    return result;
};

let resultPart2 = findTrioBySum(inputDay1, 2020);
console.log(resultPart2.reduce(function(a,b){return a*b;}));