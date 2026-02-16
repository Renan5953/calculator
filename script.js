const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => {
    if (n2 === 0) return "error";
    return n1 / n2;
};

let firstNum = [];
let operation = null;
let secondNum = [];
let result = null;

const operate = (n1, n2, operation) => operation(n1, n2);

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

const operators = new Set([
    "+", "-", "×", "÷", "*", "/"
]);

const allowedKeys = new Set([
    "0", "1", "2", "3", "4",
    "5", "6", "7", "8", "9",
    "+", "-", "*", "/", ".",
    "Enter", "Backspace",
    "Escape"
]);

const getOperation = value => {
    if (value === "+") return add;
    if (value === "-") return subtract;
    if (value === "×" || value === "*") return multiply;
    if (value === "÷" || value === "/") return divide;
};

const getSign = item => {
    if (item === add) return "+";
    if (item === subtract) return "-";
    if (item === multiply) return "×";
    if (item === divide) return "÷";
};

const updateChoice = choice => {
    const num = Number(choice);

    if ((Number.isInteger(num) || choice === ".") && operation === null) {
        if (choice === "." && !firstNum.includes(".")) {
            if (firstNum.length === 0) return;

            firstNum.push(choice);

        } else if (Number.isInteger(num)) {
            firstNum.push(num);
        }

        return;
    }

    if (
        (operation === null || operation !== null) &&
        firstNum.length !== 0 &&
        operators.has(choice) &&
        choice !== undefined
    ) {
        operation = getOperation(choice);
        return;
    }

    if ((Number.isInteger(num) || choice === ".") && result === null) {
        if (choice === "." && !secondNum.includes(".")) {
            if (secondNum.length === 0) return;

            secondNum.push(choice);

        } else if (Number.isInteger(num)) {
            secondNum.push(num);
        }

        return;
    }
};

const updateDisplay = item => {

    updateChoice(item);

    if (result !== null) {
        display.textContent = clampDecimalPlaces(result);
        return;
    }
    if (firstNum.length !== 0 || firstNum.length === 0) {
        display.textContent = firstNum.join("");
    }
    if (operation !== null) {
        display.textContent += ` ${getSign(operation)}`;
    }
    if (secondNum.length !== 0) {
        display.textContent += ` ${secondNum.join("")}`;
    }
};

const backspace = () => {
    if (firstNum.length === 0) return;

    if (firstNum.length !== 0 && operation !== null && secondNum.length !== 0) {
        secondNum.pop();
        updateDisplay();
        return;
    }
    if (firstNum.length !== 0 && operation !== null) {
        operation = null;
        updateDisplay();
        return;
    }
    if (firstNum.length !== 0) {
        firstNum.pop();
        updateDisplay();
        return;
    }
};

const clearAll = () => {
    firstNum.length = 0;
    operation = null;
    secondNum.length = 0;
    result = null;
    updateDisplay();
};

const startNewOperation = value => {
    const n1 = Number(firstNum.join(""));
    const n2 = Number(secondNum.join(""));

    if (result === null) {
        const solution = clampDecimalPlaces(operate(n1, n2, operation));

        if (solution === "error") {
            firstNum.length = 0;
            result = solution;
            return;
        }

        firstNum = String(solution).split("");
        operation = null;
        secondNum.length = 0;

    } else if (![null, "error"].includes(result)) {
        const num = Number(value);

        Number.isInteger(num)
            ? (firstNum.length = 0)
            : (firstNum = String(result).split(""));
        operation = null;
        secondNum.length = 0;
        result = null;
    }
};

const clampDecimalPlaces = num => {
    const [int, dec] = String(num).split(".");

    if (dec === undefined || dec.length <= 10) return num;

    return Number(num.toFixed(10));
};

buttons.addEventListener('click', (e) => {
    const value = e.target.value;
    if (value === undefined) return;

    if (
        (operators.has(value) &&
        (![null, "error"].includes(result) ||
        (result === null && secondNum.length !== 0))) ||
        (Number.isInteger(+value) && result !== null)
    ) {
        startNewOperation(value);
    }

    if (value === "=") {
        const n1 = Number(firstNum.join(""));
        const n2 = Number(secondNum.join(""));

        result = operate(n1, n2, operation);
        updateDisplay();
        return;
    }

    if (value === "clr-last") {
        backspace();
        return;
    }
    if (value === "clr-all") {
        clearAll();
        return;
    }

    updateDisplay(value);
});

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!allowedKeys.has(key)) return;

    if (
        (operators.has(key) &&
        (![null, "error"].includes(result) ||
        (result === null && secondNum.length !== 0))) ||
        (Number.isInteger(+key) && result !== null)
    ) {
        startNewOperation(key);
    }

    if (key === "Enter") {
        e.preventDefault();

        const n1 = Number(firstNum.join(""));
        const n2 = Number(secondNum.join(""));

        result = operate(n1, n2, operation);
        updateDisplay();
        return;
    }

    if (key === "Backspace") {
        backspace();
        return;
    }
    if (key === "Escape") {
        clearAll();
        return;
    }

    updateDisplay(key);
});