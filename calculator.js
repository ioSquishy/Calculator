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