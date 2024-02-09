# Odin Project - HashMap

This project is part of the Odin Project curriculum. It is a simple implementation of a HashMap in JavaScript.
[Project link](https://www.theodinproject.com/lessons/javascript-hashmap)

## Overview

The HashMap class in this project uses separate chaining to handle collisions. Each bucket in the HashMap is a LinkedList. When a collision occurs, the key-value pair is stored in the LinkedList at the corresponding bucket index.

## Features

- `set(key, value)`: Adds a key-value pair to the HashMap. If the key already exists, its value is updated.
- `get(key)`: Returns the value associated with the given key. If the key does not exist, it returns null.
- `remove(key)`: Removes the key and its associated value from the HashMap.
- `getItems()`: Returns all key-value pairs in the HashMap as an array of arrays.
- `expand()`: Doubles the capacity of the HashMap and rehashes all key-value pairs.
- `isLoadFactorExceed()`: Checks if the load factor (number of items / capacity) exceeds the set load factor (0.75 by default).

## Usage

Import the HashMap class from the `hashMap.js` file and create a new instance:

```javascript
import { HashMap } from "./hashMap.js";

let gradeBook = new HashMap();

//set value
gradeBook.set("Alice", 85);
gradeBook.set("Bob", 90);
gradeBook.set("Charlie", 95);

//get value
console.log(`Alice's grade: ${gradeBook.get("Alice")}`);
//remove value
gradeBook.remove("Bob");
//check if value is remove
console.log(`Bob's grade: ${gradeBook.get("Bob")}`); 

//all items
console.log(gradeBook.getItems());

//formated string
console.log(gradeBook.toString())
```