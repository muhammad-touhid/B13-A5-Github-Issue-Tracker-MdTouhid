# Assignment-05 theory

## Answer to question 1

### Difference between var, let and const.
In javascript var, let and const are used to declare variables, but they differ in terms of scope, re-declaration, re-assignment and hosting.

1. var is function scoped. let and const are block scoped.
2. var allows re-declaration but let and const do not allow re-declaration in same scope.
3. var and let allow re-assignment of values but const does not allow re-assignment of vlues.
4. var is hoisted and initialized with undefined. let and const are also hoisted but not initialized.

## Answer to question 2

The spread operator is a feature in javascript that allows array, string or object to be expended into individual elements.The spread operator is mainly used to copy elements, merge arrays or objects and pass multiple values as separate arguments in functions.

## Answer to question 3

### Difference between map(), filter() and forEach() in JavaScript
map(), filter() and forEach() are array method used to iterate over elements but they differ in purpose, return value and usage.

1. the map() method is used to transform each element of an array. the filter() method is used to select element based on a condition and the forEach() method is used to execute a function for each element in the array.
2. map() method applies a function to every element and returns a new array with modified values. filter() method returns a new array containing only the elements that satisfy the condition. forEach() method does not return any value.
3. In map() method the orginal array remains unchanged. In filter() method the orginal array is not modified. forEach() method is mainly used for side effects like logging, updating UI or modifying external variables.

## Answer to question 4

An arrow function is a shorter and more concise way to write functios in javascript introduced in ES6. It uses => syntax instead of the traditional function keyword. Arrow function are defined using the arrow => symbol making the code more compact and readable.

## Answer to question 5

Template literals are a feature in javascript introduced in ES6 that allow us to create strings in a more felxible and readable way using backticks (``) instead of single or double quotes. It allows embedding variables or expressions directly inside a string using ${} syntax.
