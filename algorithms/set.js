function Set(initSet) {
    var set = [];
    if (initSet && initSet instanceof Array) {
        for (var value of initSet) {
            if (!set.includes(value)) {
                set.push(value);
            }
        }
    }

    this.length = function () {
        return set.length;
    };
    this.has = function (value) {
        return set.includes(value);
    };
    this.remove = function (value) {
        var index = set.indexOf(value);
        if (index !== -1) {
            delete set[index];
        }
    };
    this.push = function (values) {
        if (values instanceof Set) {
            for (var value of values.values()) {
                this.push(value);
            }
            return;
        }
        if (!set.includes(values)) {
            set.push(values);
        }
    };
    this.values = function () {
        return Object.assign([], set);
    };
    this.union = function (otherSet) {
        var unionSet = new Set(set);
        unionSet.push(otherSet);
        return unionSet;
    };
    this.intersection = function (otherSet) {
        var intersectionSet = new Set();
        for (var value of otherSet.values()) {
            if (this.has(value)) {
                intersectionSet.push(value);
            }
        }
        return intersectionSet;
    };
    this.difference = function (otherSet) {
        var differenceSet = new Set();
        for (var value of otherSet.values()) {
            if (!this.has(value)) {
                differenceSet.push(value);
            }
        }
        return differenceSet;
    };
    this.subset = function (otherSet) {
        for (var value of otherSet.values()) {
            if (!this.has(value)) {
                return false;
            }
        }
        return true;
    }
}
