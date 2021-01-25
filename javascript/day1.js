// since I don't want to bother too much with reading the input from text file
// I will store my input in this file for convenience
var input = [408, 1614, 1321, 1028, 1018, 2008, 1061, 1433, 1434, 1383, 1645, 
             1841, 1594, 1218, 1729, 1908, 1237, 1152, 1771, 1837, 1709, 1449, 
             1876, 1763, 1676, 1491, 1983, 1743, 1845, 999, 1478, 1929, 1819, 
             1385, 1308, 1703, 1246, 1831, 1964, 1469, 1977, 1488, 1698, 1640, 
             1513, 1136, 1794, 1685, 1802, 1520, 1807, 1654, 1547, 1917, 1792, 
             1949, 1268, 1626, 1493, 1534, 1700, 1844, 1146, 1049, 1811, 1627, 
             1630, 1755, 1887, 1290, 1446, 1968, 168, 1749, 1479, 1651, 1646, 
             1839, 14, 1918, 1568, 1554, 1926, 1942, 1862, 1966, 1536, 1599, 
             1439, 1766, 1643, 1045, 1537, 1786, 1596, 1954, 1390, 1981, 1362,
              1292, 1573, 1541, 1515, 1567, 1860, 1066, 1879, 1800, 1309, 1533, 
              1812, 1774, 1119, 1602, 1677, 482, 1054, 1424, 1631, 1829, 1550, 
              1636, 1604, 185, 1642, 1304, 1843, 1773, 1667, 1530, 1047, 1584, 
              1958, 1160, 1570, 1705, 1582, 1692, 1886, 1673, 1842, 1402, 1517, 
              1805, 1386, 1165, 1867, 1153, 1467, 1473, 1803, 1967, 1485, 1448, 
              1922, 1258, 1590, 1996, 1208, 1241, 1412, 1610, 1219, 523, 1813, 
              1123, 1916, 1861, 1020, 1783, 1052, 1140, 1994, 1761, 747, 1885, 
              1675, 1957, 1476, 1382, 1878, 1099, 1882, 855, 1905, 1037, 1714, 
              1988, 1648, 1135, 1859, 1798, 1333, 1158, 1909, 652, 1934, 1830, 1442, 1224];

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

var resultPart1 = findValuePairBySum(input, 2020);
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

let resultPart2 = findTrioBySum(input, 2020);
console.log(resultPart2.reduce(function(a,b){return a*b;}));