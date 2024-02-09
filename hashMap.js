import { LinkedList } from "./linkedList.js";

export class HashMap {
    #initialCapacity = 16;
    #buckets = new Array(this.#initialCapacity).fill(null)
                .map(() => new LinkedList());
    
    constructor() {
        this.capacity = this.#initialCapacity;
        this.loadFactor = 0.75;
        this.length = 0;
    }

    generateHash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    getKeyIndex(key, capacity) {
        let keyValue = 0;
        for (let i = 0; i < key.length; i++) {
            keyValue = keyValue + key.charCodeAt(i);
        }
        return keyValue % capacity;
    }

    set(key, value) {
        if (!isNaN(key))
            key = String(key);
            const bucketIndex = this.getKeyIndex(key, this.capacity);
            const hashCode = this.generateHash(key);
            const currentBucket = this.#buckets[bucketIndex];
            const node = currentBucket.find(hashCode);
        if (!node) {
            currentBucket.append(hashCode, {key, value})
            this.length++;
        } else {
            node.value = value.value;
        }

        if (this.isLoadFactorExceed()) {
            this.expand();
        }
    }

    get(key) {
        const bucketIndex = this.getKeyIndex(key, this.capacity);
        const hashCode = this.generateHash(key);
        const node = this.#buckets[bucketIndex].find(hashCode);
        if (!node)
            return null;
        return node.value.value;
    }

    remove(key) {
        return this.#buckets[this.getKeyIndex(key, this.capacity)]
                    .remove( this.generateHash(key));
    }

    getItems() {
        const items = [];
        for (let elem of this.#buckets) {
            let current = elem.head();
            while (current) {
                items.push([current.value.key, current.value.value]);
                current = current.next;
            }
        }
        return items;
    }

    expand() {
        const newCapacity = this.capacity * 2;
        const newBucket = new Array(newCapacity).fill(null)
                          .map(() => new LinkedList());
        for (let i = 0; i < this.capacity; i++) {
            let current = this.#buckets[i].head();
            while (current) {
                const {key, value} = current.value;
                const newBucketIndex = this.getKeyIndex(key, newCapacity);
                newBucket[newBucketIndex].append(current.key, {key, value})
                current = current.next;
            }
        }
        this.capacity = newCapacity;
        this.#buckets = newBucket;
    }
    isLoadFactorExceed() {
        const sizeCapacityRatio = (this.length / this.capacity);
        if (sizeCapacityRatio >= this.loadFactor)
            return true;
        return false;
    }

    toString() {
        const allItems = this.getItems();
        const obj = {};
        allItems.forEach(item => {
            obj[item[0]] = item[0];
        })
        return obj;
    }
}



