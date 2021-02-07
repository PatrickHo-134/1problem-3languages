var { inputDay3 } = require('./input');
var assert = require('assert');

function isTree(area, coordinate){
    let [col, row] = coordinate;
    let position = area[row][col];

    return position == "#";
}

function shouldExpandMap(area, coordinate, slope=[1,1]){
    let currentIndex = coordinate[0];
    let maxIndex     = area[0].length - 1;
    let rightSteps   = slope[0];

    return ((maxIndex - currentIndex) < rightSteps);
}

function expandMap(currentArea, addingArea){
    assert(
        currentArea.length == addingArea.length,
        "Adding area doesn't have the same shape as the current area"
        );

    // Note: map function works very differently in javascript compared to python,
    // so you can't use map function as following
    // let newArea = currentArea.map(function (a, b){return a + b}, addingArea);
    // The working way is like this:
    let newArea = currentArea.map(function(a, i){return a + addingArea[i]})
    return newArea
}

function makeAMove(position, slope=[1,1]){
    let [x, y] = position;
    return [x+slope[0], y+slope[1]]
}

// PART 1
function countTreesOnPath(area, slope=[3,1]){
    let movingPosition = [0,0];
    let fullMap = area;
    
    if (isTree(fullMap, movingPosition)){
        var countTrees = 1;
    } else {
        var countTrees = 0;
    }

    while (movingPosition[1] < (fullMap.length - slope[1])){
        if (shouldExpandMap(fullMap, movingPosition, slope)){
            fullMap = expandMap(fullMap, area);
        }

        movingPosition = makeAMove(movingPosition, slope);

        if (isTree(fullMap, movingPosition)){
            countTrees += 1;
        }
    }

    return countTrees
}

console.log(countTreesOnPath(inputDay3, [3,1]));

// PART 2
let slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]];
let treeOnEachSlope = slopes.map(function(a){return countTreesOnPath(inputDay3, a)});

console.log(treeOnEachSlope.reduce(function(a,b){return a*b}));