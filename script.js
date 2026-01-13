const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n1 / n2;

let firstNum;
let operation;
let secondNum;

const operate = (n1, n2, operation) => operation(n1, n2);