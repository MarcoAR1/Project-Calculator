const screen = document.getElementById("outputtext");
screen.textContent = 0;
const screenNum = document.querySelectorAll(".KaysNum");
const fieldScreen = document.getElementById("outputsimb");
const controls = document.querySelectorAll(".KaysSimb");
let screenValue = "";
let sign = "";
let startOver = false;

for (let i = 0; i < screenNum.length; i++) {
  screenNum[i].addEventListener("click", () => {
    populate(screenNum[i]);
  });
}
document.addEventListener("keydown", function (event) {
  for (let i = 0; i < screenNum.length; i++) {
    if (screenNum[i].textContent == event.key) {
      populate(screenNum[i]);
    } else if (event.key == "Backspace") {
      screen.textContent = 0;
    }
  }
});
for (let i = 0; i < controls.length; i++) {
  controls[i].addEventListener("click", () => {
    if (controls[i].textContent == "+") {
      evaluate("+");
      fieldScreen.textContent = screen.textContent + " +";
    } else if (controls[i].textContent == "*") {
      evaluate("*");

      fieldScreen.textContent = screen.textContent + " *";
    } else if (controls[i].textContent == "/") {
      evaluate("/");
      fieldScreen.textContent = screen.textContent + " /";
    } else if (controls[i].textContent == "C") {
      clearScreen();
    } else if (controls[i].textContent == "-") {
      evaluate("-");
      fieldScreen.textContent = screen.textContent + " -";
    } else if (controls[i].textContent == "=") {
      fieldScreen.textContent = "=";
      operate(sign, screenValue, screen.textContent);
      screenValue = screen.textContent;
      sign = "";
    }
  });
}

function add(a, b) {
  a = +a;
  b = +b;
  let result = (a + b).toString();
  screen.textContent = convert(result);
}

function subtract(a, b) {
  let result = (a - b).toString();
  screen.textContent = convert(result);
}

function multiply(a, b) {
  let result = (a * b).toString();
  screen.textContent = convert(result);
}

function divide(a, b) {
  if (b == 0) {
    clearScreen();
    fieldScreen.textContent = "Oh oh D: so much";
  } else {
    let result = (a / b).toString();
    screen.textContent = convert(result);
  }
}

function clearScreen() {
  sign = "";
  screenValue = 0;
  fieldScreen.textContent = "";
  screen.textContent = 0;
  startOver = false;
}
function operate(operator, a, b) {
  if (operator == "+") {
    add(a, b);
  } else if (operator == "-") {
    subtract(a, b);
  } else if (operator == "*") {
    multiply(a, b);
  } else if (operator == "/") {
    divide(a, b);
  }
  startOver = true;
}

function populate(btn) {
  if (startOver) {
    screen.textContent = 0;
    startOver = false;
  }

  if (screen.textContent == 0) {
    if (btn.textContent == ".") {
      checkForCompliance(btn);
    } else if (screen.textContent.length > 1) {
      screen.textContent += btn.textContent;
    } else {
      screen.textContent = btn.textContent;
    }
  } else {
    checkForCompliance(btn);
  }
}

function checkForCompliance(btn) {
  if (screen.textContent.length >= 13) {
    return;
  }
  if (screen.textContent.includes(".") && btn.textContent == ".") {
    return;
  } else {
    screen.textContent += btn.textContent;
  }
}
function evaluate(operator) {
  if (sign == operator) {
    operate(sign, screenValue, screen.textContent);
    screenValue = screen.textContent;
  } else if (!sign) {
    sign = operator;
    screenValue = screen.textContent;
    startOver = true;
  } else {
    operate(sign, screenValue, screen.textContent);
    sign = operator;
    screenValue = screen.textContent;
  }
}

function convert(result) {
  if (result.length > 9) {
    result = parseFloat(result);
    return result.toExponential(1);
  } else {
    return result;
  }
}
