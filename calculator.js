const calculator = document.querySelector("#calculator");
const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll(".buttons button");

// Listeners
//Click Listener
buttons.forEach(button => {
  button.addEventListener("click", onClickListener);
})
let input = [0];
let inputIsResult = false;
function onClickListener(event) {
  let value = event.target.innerText;
  console.log(`Clicked: ${value}`);
  
  if (value === "C") {
    input = [0];
  } else if (value === "=") {
    let numberResult = calculate(input);
    let localeResult = numberResult.toLocaleString();
    screen.innerText += ` = \n${localeResult}`;
    input = [numberResult];
    return;
  } else if (isNaN(value)) {
    input.push(value);
    input.push(0);
  } else {
    if (input.length === 1 && input.at(-1) != 0) {
      input = [0];
    }
    input[input.length - 1] = (input.at(-1) * 10) + Number(value);
  }

  renderInputOnScreen();
}

function renderInputOnScreen() {
  let output = "";

  for (let item of input) {
    if (isNaN(item)) {
      output += ` ${item} `;
    } else if (item != 0) {
      output += item.toLocaleString();
    }
  }

  screen.innerText = output;
}

// Calculator logic
/**
 * Calculates result from array of inputs
 * @param {Array} equation 
 * @return {Number} result
 */
function calculate(equation) {
  console.log(`Calculating: ${equation}`);
  let result = 1;

  //TODO calculatee

  // evaulate equation
  if (!isFinite(result)) {
    result = "undefined"
  }
  console.log(`Result: ${result}`);
  return result;
}