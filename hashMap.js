import { LinkedList } from "./linkedList.js";

class HashMap {
    #initialCapacity = 16;
    #buckets = new Array(this.#initialCapacity).fill(null)
                .map(elem => new LinkedList());
    #keys = [];
    
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

    getKeyIndex(key) {
        let keyValue = 0;
        for (let i = 0; i < key.length; i++) {
            keyValue = keyValue + key.charCodeAt(i);
        }
        return keyValue % this.capacity;
    }

    getHashBucketAndNode(key) {
        const keyBucket = this.getKeyIndex(key);
        const hashCode = this.generateHash(key);
        const currentBucket = this.#buckets[keyBucket];
        const node = currentBucket.find(hashCode); //to check if same key exist
        return {hashCode, currentBucket, node};
    }

    set(key, value) {
        if (!isNaN(key))
            key = String(key);
        const { hashCode, currentBucket, node } = this.getHashBucketAndNode(key);
        if (!node) {
            currentBucket.append(hashCode, value);
            this.length++;
        } else {
            node.value = value;
        }

        this.#keys.push(key);
    }

    get(key) {
        const { node } = this.getHashBucketAndNode(key);
        if (!node)
            throw Error(`KeyError \'${key}\'`);
        return node.value;
    }

    getItems() {
        return this.#keys.map(key => {
            return [ key, this.get(key) ]
        });
    }

    isLoadFactorExceed() {
        const sizeCapacityRatio = (this.length / this.capacity);
        if (sizeCapacityRatio >= this.loadFactor)
            return true;
        return false;
    }
}

const a = new HashMap();
a.set(12, "12");
a.set("bc", 120);
console.log(a.getItems());