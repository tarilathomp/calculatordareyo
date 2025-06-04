const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
let currentInput = "";
let operator = "";
let firstOperand = "";
let waitingForSecondOperand = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("clear")) {
      // Clear button
      currentInput = "";
      operator = "";
      firstOperand = "";
      waitingForSecondOperand = false;
      display.value = "";
    } else if (button.classList.contains("operator")) {
      // Operator button
      if (currentInput !== "") {
        if (firstOperand === "") {
          firstOperand = currentInput;
          operator = button.getAttribute("data-op");
          waitingForSecondOperand = true;
          display.value = firstOperand + " " + button.textContent;
          currentInput = "";
        }
      }
    } else if (button.classList.contains("equal")) {
      // Equal button
      if (firstOperand !== "" && operator !== "" && currentInput !== "") {
        let result;
        const a = parseFloat(firstOperand);
        const b = parseFloat(currentInput);
        switch (operator) {
          case "+":
            result = a + b;
            break;
          case "-":
            result = a - b;
            break;
          case "*":
            result = a * b;
            break;
          case "/":
            result = b !== 0 ? a / b : "Error";
            break;
          default:
            result = "Error";
        }
        display.value = result;
        // Reset for next calculation
        if (result === "Error") {
          // Reset all state after error so calculator is usable again
          currentInput = "";
          operator = "";
          firstOperand = "";
          waitingForSecondOperand = false;
        } else {
          currentInput = "";
          operator = "";
          firstOperand = "";
          waitingForSecondOperand = false;
        }
      }
    } else {
      // Digit button
      currentInput += button.textContent;
      display.value = currentInput;
    }
  });
});
