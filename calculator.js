const calculator = document.querySelector("#calculator");
const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll(".buttons button");

// Listeners
//Click Listener
buttons.forEach(button => {
  button.addEventListener("click", onClickListener);
})
function onClickListener(event) {
  let value = event.target.innerText;
  console.log(`Clicked: ${value}`);

  if (value === "C") {
    input = "";
  } else if (value === "=") {
    input = calculate(input);
  } else if (isNaN(value)) {
    input += ` ${value} `;
  } else {
    input += `${value}`;
  }

  screen.innerText = input;
}

// Calculator logic
let input = "";
/**
 * Calculates result from plain-text equation
 * @param {String} equation 
 * @return {Number} result
 */
function calculate(equation) {
  console.log(`Calculating: ${equation}`);
  let cleanEquation = "";
  for (let i = 0; i < equation.length; i++) {
    if (equation[i] === "×") {
      cleanEquation += "*";
      continue;
    }
    if (equation[i] === " ") {
      continue;
    }
    cleanEquation += equation[i];
  }
  console.log(`Cleaned input: ${cleanEquation}`);
  let result = eval(cleanEquation);
  console.log(`Result: ${result}`);
  return result;
}