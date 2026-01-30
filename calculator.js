const calculator = document.querySelector("#calculator");
const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll(".buttons button");

// Listeners
//Click Listener
buttons.forEach(button => {
  button.addEventListener("click", onClickListener);
})
let input = "";
let lastNum = 0;
let lastNumStartIndex = 0;
let inputIsResult = false;
function onClickListener(event) {
  let value = event.target.innerText;
  console.log(`Clicked: ${value}`);

  /**
   * todo: bug fix
   * for some reason after press =,
   * the lastNumStartIndex is 1 greater than it should
   */
  if (value === "C") {
    input = "";
    lastNum = 0;
    lastNumStartIndex = 0;
  } else if (value === "=") {
    let result = calculate(input);
    input = result.toLocaleString('en-US');
    screen.innerText += ` = \n${input}`;
    lastNum = result;
    inputIsResult = true;
    lastNumStartIndex = 0;
    return;
  } else if (isNaN(value)) {
    inputIsResult = false;
    input += ` ${value} `;
    lastNumStartIndex = input.length + 1;
    lastNum = 0;
  } else {
    if (inputIsResult) {
      lastNum = 0;
      inputIsResult = false;
    }
    lastNum = (lastNum * 10) + Number(value);
    input = input.substring(0, lastNumStartIndex) + lastNum.toLocaleString('en-US');
  }

  screen.innerText = input;
}

// Calculator logic
/**
 * Calculates result from plain-text equation
 * @param {String} equation 
 * @return {Number} result
 */
function calculate(equation) {
  console.log(`Calculating: ${equation}`);
  // clean up equation
  let cleanEquation = "";
  for (let i = 0; i < equation.length; i++) {
    // skip/replace cosmetic characters
    switch (equation[i]) {
      case "×":
        cleanEquation += "*";
      case "*":
      case " ":
      case ",":
        continue;
      default:
        // if not a number, ensure character is expected
        if (isNaN(equation[i])) {
          switch(equation[i]) {
            case "+":
            case "-":
            case "/":
              cleanEquation += String(equation[i]);
              continue;
            default:
              console.log(`Unexpected value in input: ${equation[i]}`);
              continue;
          }
        } else {
          // if a number, add it to equation
          cleanEquation += String(equation[i]);
        }
    }
  }
  console.log(`Cleaned input: ${cleanEquation}`);

  // evaulate equation
  let result = eval(cleanEquation);
  if (!isFinite(result)) {
    result = "undefined"
  }
  console.log(`Result: ${result}`);
  return result;
}