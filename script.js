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

const operators = ["+", "-", "×", "÷"];

const getOperation = value => {
    if (value === "+") return add;
    if (value === "-") return subtract;
    if (value === "×") return multiply;
    if (value === "÷") return divide;
};

const getSign = item => {
    if (item === add) return "+";
    if (item === subtract) return "-";
    if (item === multiply) return "×";
    if (item === divide) return "÷";
};

const updateChoice = choice => {
    if ((Number.isInteger(+choice) || choice === ".") && operation === null) {
        if (choice === "." && !firstNum.includes(".")) {
            firstNum.push(choice);

        } else if (Number.isInteger(+choice)) {
            firstNum.push(Number(choice));
        }

        return;
    }

    if (
        (operation === null || operation !== null) &&
        firstNum.length !== 0 &&
        operators.includes(choice) &&
        choice !== undefined
    ) {
        operation = getOperation(choice);
        return;
    }

    if ((Number.isInteger(+choice) || choice === ".") && result === null) {
        if (choice === "." && !secondNum.includes(".")) {
            secondNum.push(choice);

        } else if (Number.isInteger(+choice)) {
            secondNum.push(Number(choice));
        }

        return;
    }
};

const updateDisplay = item => {

    updateChoice(item);

    if (result !== null) {
        display.textContent = result;
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
    if (result === null) {
        firstNum = String(operate(+firstNum.join(""), +secondNum.join(""), operation)).split("");
        operation = null;
        secondNum.length = 0;

    } else if (![null, "error"].includes(result)) {
        Number.isInteger(+value)
            ? (firstNum.length = 0)
            : (firstNum = String(result).split(""));
        operation = null;
        secondNum.length = 0;
        result = null;
    }
};

buttons.addEventListener('click', (e) => {
    const value = e.target.value;
    if (value === undefined) return;

    if (
        (operators.includes(value) &&
        (![null, "error"].includes(result) ||
        (result === null && secondNum.length !== 0))) ||
        (Number.isInteger(+value) && result !== null)
    ) {
        startNewOperation(value);
    }

    if (value === "=") {
        result = operate(+firstNum.join(""), +secondNum.join(""), operation);
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