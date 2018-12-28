function LinkedList() {
    var head = null,
        tail = null,
        length = 0;
    this.length = function () {
        return length;
    }
    this.head = function () {
        return head;
    };
    this.tail = function () {
        return tail;
    };
    this.add = function (value) {
        var node = {
                value: value,
                next: null
            };
        if (head) {
            tail.next = node;
            tail = node;
        } else {
            head = node;
            tail = node;
        }
        length++;
    };
    this.get = function (index) {
        if (index > length || index < 0) {
            return null;
        }
        var i = 0,
            node = head;
        while (i < length) {
            if (i === index) {
                return node.value;
            }
            node = node.next;
            i++;
        }
    };

    this.remove = function (index) {
        if (typeof index === 'number' && (index >= length || index < 0)) {
            return null;
        }
        length--;
        var i = 0,
            prevNode = head,
            node = prevNode.next;
        if (index === 0) {
            head = node;
            return prevNode.value;
        }
        while (i <= length) {
            if (i === index) {
                prevNode.next = node.next;
                return node.value;
            }
            if (!node.next) {
                prevNode.next = node.next;
                tail = prevNode;
                return node.value;
            }
            prevNode = node;
            node = node.next;
            i++;
        }
        return null;
    };

    this.toString = function () {
        if (!length) {
            return '(empty)';
        }
        var i = 0,
            string = [],
            node = head;
        while (i < length) {
            string.push(node.value);
            node = node.next;
            i++;
        }
        return string.join(', ');
    };

    this.getAll = function () {
        if (!length) {
            return [];
        }
        var all = [],
            node = head;
        while(node) {
            all.push(node);
            node = node.next;
        }
        return all;
    };
}
