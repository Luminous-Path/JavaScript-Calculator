const calculator = document.getElementById('calculator');
const displayCurrent = document.getElementById('current-operand');
const displayPrevious = document.getElementById('previous-operand');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot');
const operationmrButtons = document.querySelectorAll('.operationmr');

let currentOperand = "";
let prevousOperand = "";
let operation = null;

numberButtons.forEach(button => {
	button.addEventListener('click', () =>{
		appendNumber(button.innerText);
		updateDisplay();
	});
});

operationButtons.forEach(button =>{
	button.addEventListener('click', ()=>{
		chooseOperation(button.innerText);
		updateDisplay();
	});
});

operationmrButtons.forEach(button =>{
	button.addEventListener('click', () =>{
		memoryFunction(button.innerText);
	});
});

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalsButton.addEventListener('click', compute);
dotButton.addEventListener('click', appendDot);

function clear(){
	currentOperand = '';
	prevousOperand = '';
	operation = null;
	updateDisplay();
}

function deleteNumber() {
	currentOperand = currentOperand.toString().slice(0, -1);
	updateDisplay();
}

function compute() {
	let computation;
	const prev = parseFloat(prevousOperand);
	const current = parseFloat(currentOperand);
	if (isNaN(current) || isNaN(prev)) return;

	switch(operation) {
		case '+': 
			computation = prev + current;
			break;
		case '-': 
			computation = prev - current;
			break;
		case '*': 
			computation = prev * current;
			break;
		case '/': 
			computation = prev / current;
			break;
		case '√':
			computation = Math.sqrt(current);
			break;
		case '^': 
			computation = Math.pow(prev, current);
			break;
		case '%': 
			computation = (prev/100) * current;
			break;
		default:
			return;
	}
	currentOperand = computation;
	operation = undefined;
	prevousOperand = '';
	updateDisplay();
}

function appendDot() {
	if (currentOperand.includes('.')) return;
	if (currentOperand ==='') currentOperand = '0';
	currentOperand += '.';
	updateDisplay();
}

function appendNumber(number){
	if (number === '.' && currentOperand.includes('.')) return;
	currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(selectedOperation) {
	if (currentOperand === '') return;
	if (prevousOperand !== '') {
		compute();
	}
	operation = selectedOperation;
	prevousOperand = currentOperand;
	currentOperand = '';
}

function updateDisplay() {
	document.getElementById('current-operand').innerText = currentOperand;
	document.getElementById('previous-operand').innerText = prevousOperand + ' ' + (operation || '');
}



let memoryValue = 0;

function memoryAdd() {
	memoryValue += parseFloat(currentOperand);
}

function memorySubtract() {
	memoryValue -= parseFloat(currentOperand);
}

function memoryRecall() {
	currentOperand = memoryValue.toString();
	updateDisplay();
}

function memoryClear() {
	memoryValue = 0;
}

function memoryFunction (memoryKey) {
  switch (memoryKey) {
    case "M+":
      memoryAdd();
      break;
    case "M-":
      memorySubtract();
      break;
    case "MR":
      memoryRecall();
      break;
    case "MC":
      memoryClear();
      break;
  }
}
document.addEventListener('keydown', (event)=>{
	if (event.key >= 0 && event.key <=9) appendNumber(event.key);
	if (event.key === '.') appendDot();
	if (event.key === 'Enter' || event.key === '=') compute();
	if (event.key ==='Backspace') deleteNumber();
	if (event.key === "Escape") clear();
	if (event.key === '+') chooseOperation(event.key);
	if (event.key === '-') chooseOperation(event.key);
	if (event.key === '/') chooseOperation(event.key);
	if (event.key === '*') chooseOperation(event.key);
	updateDisplay();
})