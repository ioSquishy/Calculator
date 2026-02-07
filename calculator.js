const calculator = document.querySelector("#calculator");
const calcScreen = document.querySelector("#screen");
const buttons = document.querySelectorAll(".buttons button");

// Listeners
// Click Listener
buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    acceptInput(e.target.innerText);
  });
});
// Key Listener
document.addEventListener("keyup", (e) => {
  let value = e.key;
  if (isNaN(value)) {
    switch (value) {
      case "*": value = "×";
      case "/":
      case "+":
      case "-":
        acceptInput(value);
        break;
      case "c":
      case "C":
      case "Escape":
      case "Backspace": 
        acceptInput("C");
        break;
      case "Enter":
        acceptInput("=")
        break;
    }
  } else {
    acceptInput(value)
  }
});

let input = [0];
let inputIsResult = true;
function acceptInput(value) {
  console.log(`Clicked: ${value}`);
  
  if (value === "C") { // clear
    input = [0];
  } else if (value === "=") { // equals
    if (inputIsResult) return;
    let numberResult = calculate(input);
    let localeResult = numberResult.toLocaleString();
    
    // render screen manually so input and screen values can diverge
    renderInputOnScreen(); // re-render to remove any cursor if applicable (cursor is the '|')
    calcScreen.innerText += ` = \n${localeResult}`;
    input = [numberResult];
    inputIsResult = true;
    return;
  } else if (isNaN(value)) { // operator
    input.push(value);
    input.push(0);
  } else { // number
    if (inputIsResult) {
      input = [0];
    }
    input[input.length - 1] = (input.at(-1) * 10) + Number(value);
  }

  inputIsResult = false;
  renderInputOnScreen();
}

/**
 * Renders the input array to the calculator screen.
 */
function renderInputOnScreen() {
  let output = "";

  for (let item of input) {
    if (isNaN(item)) {
      output += ` ${item} `;
    } else if (item != 0) {
      output += item.toLocaleString();
    }
  }

  calcScreen.innerText = output;
}

/**
 * Converts an infix expression array to postfix.
 * @param {Array} infix expression
 * @return {Array} postfix expression
 */
function convertToPostfix(infix) {
  const precedence = {
    '+': 1,
    '-': 1,
    '×': 2,
    '/': 2
  }

  let operators = []; // stack
  let postfix = [];

  // convert to postfix
  for (let exp of input) {
    // push numbers to postfix
    if (!isNaN(exp)) {
      postfix.push(exp);
      continue;
    }
    // operator postfix logic
    let topOperation = operators.at(-1);
    if (operators.length != 0 && precedence[topOperation] >= precedence[exp]) {
      postfix.push(operators.pop());
    }
    operators.push(exp);
  }

  // pop any remaining operators from the stack and append them to the postfix array
  while (operators.length != 0) {
    postfix.push(operators.pop());
  }

  return postfix;
}

/**
 * Calculates result from array of inputs
 * @param {Array} equation 
 * @return {Number} result
 */
function calculate(equation) {
  console.log(`Calculating: ${equation}`);
  let postfix = convertToPostfix(input);

  let numbers = [];
  for (let exp of postfix) {
    if (!isNaN(exp)) {
      numbers.push(exp);
    } else {
      let num2 = numbers.pop();
      let num1 = numbers.pop();
      let result;
      switch (exp) {
        case "+": result = num1 + num2; break;
        case "-": result = num1 - num2; break;
        case "×": result = num1 * num2; break;
        case "/": result = num1 / num2; break;
        default: console.log(`Unknown exp: ${exp}`);
      }
      numbers.push(result);
    }
  }

  // evaulate equation
  if (!isFinite(numbers[0])) {
    return "undefined"
  }
  console.log(`Result: ${numbers[0]}`);
  return numbers[0];
}