let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  //   console.log(value);
  if (isNaN(value)) {
    // this is not a number
    handleSymbol(value);
  } else {
    // this is a number
    handleNumber(value);
  }
  screen.innerText = buffer; // we want to re-render the screen every time a button is pressed
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        // user hasn't chosen an operator yet
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    // do nothing
    return;
  }
  // could also write as +buffer;
  const intBuffer = parseInt(buffer);

  // elseif not necessary because of the return statement
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;

  buffer = "0";
}

function flushOperation(intBuffer) {
  // do the maths!
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "−") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

// to handle number button presses
function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

// we call this function at the start, to add event listener at the top level
function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function(event) {
      //   when the button is clicked, process begins.....
      buttonClick(event.target.innerText);
    });
}

init();
