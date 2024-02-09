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

    remove(key) {
        let current = this.head();
        if (current === null)
            return current;

        if (this.#_head.key === key) {
            const value = this.#_head.value;
            this.#_head = this.#_head.next;
            this.#_size--;
            return value;
        }

        while (current && current.next != null) {
            if (current.next.key === key) {
                const value = current.next.value;
                current.next = current.next.next;
                this.#_size--;
                return value;
            }
            current = current.next;
        }
        return null;
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
