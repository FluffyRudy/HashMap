class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next  = null;
    }

    toString() {
        return `Node { key: ${this.key}, value: ${this.value}, next: ${this.next ? this.next.key : 'null'} }`;
    }
}

export class LinkedList {
    #_head = null;
    #_tail = null;
    #_size = 0;

    append(key, element) {
        const temp = new Node(key, element);
        if (this.#_head !== null) {
            this.#_tail.next = temp;
            this.#_tail = temp;
        } else {
            this.#_head = this.#_tail = temp;
        }
        this.#_size++;
    }

    prepend(key, element) {
        const temp = new Node(key, element);
        if (this.#_head !== null) {
            temp.next = this.#_head;
            this.#_head = temp;
        } else {
            this.#_head = this.#_tail = temp;
        }
        this.#_size++;
    }

    size() {
        return this.#_size;
    }

    head() {
        return this.#_head;
    }

    tail() {
        return this.#_tail;
    }

    at(index) {
        if (index < 0 || index >= this.#_size)
            throw Error("IndexError: index out of range");
        let temp = this.#_head;
        let localIndex = 0;
        while (temp !== null) {
            if (localIndex === index)
                return temp;
            localIndex++;
            temp = temp.next;
        }
        return temp;
    }

    pop() {
        if (this.#_size === 0)
            throw Error("IndexError: pop from empty list");
        if (this.#_size === 1) {
            this.#_head = null;
            this.#_tail = null;
        } else {
            let temp = this.#_head;
            while (temp.next.next != null) {
                temp = temp.next;
            }
            temp.next = null;
            this.#_tail = temp;
        }
        this.#_size--;
    }

    find(key) {
        let temp = this.#_head;
        let i = 0;
        while (temp != null) {
            if (temp.key === key)
                return temp;
            i++;
            temp = temp.next;
        }
        return null;
    }

    contains(key) {
        return this.find(key) === null ? false : true;
    }

    insertAt(key, value, index) {
        if (index < 0 || index >= this.#_size)
          throw Error("IndexError: index out of range");
        if (index === 0)
            this.prepend(key, value);
        else if (index === this.#_size-1)
            this.append(key, value);
        else {
            let i = 0;
            let temp = this.#_head;
            while (temp.next != null && i+1 !== index) {
                temp = temp.next;
                i++;
            }
            const newNode = new Node(key, value);
            newNode.next = temp.next;
            temp.next = newNode;
            this.size++;
        }
    }

    removeAt(index) {
        if (index < 0 || index >= this.#_size)
            throw Error("IndexError: index out of range");
        if (index === 0) {
            this.#_head = this.#_head.next;
            this.#_size--;
        }
        else if (index === this.#_size - 1)
            this.pop();
        else {
            let i = 0;
            let temp = this.#_head;
            while (temp.next != null && i+1 !== index) {
                temp = temp.next;
                i++;
            }
            temp.next = temp.next.next;
            this.#_size--;
        }
    }

    toString() {
        let temp = this.#_head;
        let result = "";
        while (temp !== null) {
          result += temp+"\n";
          temp = temp.next;
        }
        return `size: ${this.#_size}\n` + result;
    }
}
