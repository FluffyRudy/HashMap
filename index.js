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