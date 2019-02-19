function binarySearch(sortedArray, value, min = 0, max = sortedArray.length - 1) {
    var medium = Math.floor((max - min) / 2) + min;
    if (sortedArray[medium] === value) return medium;
    if (min === max) return -1;
    if (sortedArray[medium] > value) return binarySearch(sortedArray, value, min, medium - 1);
    return binarySearch(sortedArray, value, medium + 1, max);
}
