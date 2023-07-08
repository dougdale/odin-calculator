
const display = document.getElementById("display");
let ops = null;

function updateDisplay() {
  var text = "0";

  if (ops != null) {
    text = ops.join("");  
  }

  display.textContent = text;
}

function getResult() {
  if (ops.length == 3) {
    let value;
    let a = parseFloat(ops[0]);
    let b = parseFloat(ops[2]);
    switch (ops[1]) {
      case '+':
        value = a + b;
        break;
      case '-':
        value = a - b;
        break;
      case '*':
        value = a * b;
        break;
      case '/':
        value = a / b;
        break;
    }

    if (!Number.isInteger(value)) {
      value = value.toFixed(2);
    }

    ops = [ value ];
  }
}

function handleOperator(operator) {
  if (ops != null) {
    if (ops.length == 2) {
      // Overwrite previous operator
      ops[0] = value;
      return;
    } else if (ops.length == 3) {
      getResult();
    }

    ops.push(value);
  }
}

function handleDigit(digit) {
  if (ops == null) {
    ops = [ digit ];
  } else if (ops.length % 2 == 1) {
    const index = ops.length - 1;

    if (digit == '.' && ops[index].indexOf('.') != -1) return;

    ops[index] += digit;
  } else {
    ops.push(value);
  }
}

function buttonClick(e) {
  value = this.textContent;

  switch (value) {
    case 'C':
      ops = null;
      break;
    case '=':
      getResult();
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      handleOperator(value);
      break;
    default:
      handleDigit(value);
      break;
  }

  updateDisplay();
}

function setup() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => button.addEventListener('click', buttonClick));

  updateDisplay();
}

setup();