import Calculator from './components/Calculator.js';

// 디스플레이 최대 입력 개수
const LIMIT_DISPLAY_LENGTH = 69;
// 피연산자 최대 입력 개수
const LIMIT_OPERAND_LENGTH = 15;

const OPERATORS_SET = new Set(['+', '-', 'x', '/', '%']);

const $ = selector => document.querySelector(selector);

const clear = () => {
  return ['', ''];
};

const backSpace = ({ innerText: input }, { innerText: output }) => {
  if (!input.length && output) return ['', ''];
  if (input.length && !output) return [input.substr(0, input.length - 1), ''];

  return [input.substr(0, input.length - 1), Calculator(input.substr(0, input.length - 1))];
};

const zero = ({ innerText: input }, keyword) => {
  if (OPERATORS_SET.has(keyword)) return input;
  const operands = input.split(/([+\-x/%])/g);
  const removedZero = operands[operands.length - 1].replace(/^0(?![.])/gm, '');
  operands.splice(operands.length - 1, 1, removedZero);
  input = operands.join('');
  return input;
};

const decimal = ({ innerText: input }) => {
  const operands = input.split(/([+\-x/%])/g);
  const isDecimal = operands[operands.length - 1].indexOf('.');
  const removedZeroDecimal = operands[operands.length - 1].replace(/(?<![1-9])[0]|[.]/gm, '');
  const operand = isDecimal ? removedZeroDecimal === '' ? '0' : removedZeroDecimal : operands[operands.length - 1];
  operands.splice(operands.length - 1, 1, operand);
  input = operands.join('');
  console.log(isDecimal, operand, operands)
  return input;
}

const inputRender = (input, $input) => {
  $input.innerText = input;
};

const outputRender = (input, $output) => {
  $output.innerText = Calculator(input);
};

const clickHandler = ({ target }) => {
  if (!target.matches('div[data-digit]')) return;
  // 현재 입력된 값
  const keyword = target.innerText;

  const $input = $('.display-input');
  const $output = $('.display-output');

  let text = $input.innerText;
  if (text.length >= LIMIT_DISPLAY_LENGTH) return;

  switch (keyword) {
    case 'C': {
      const [returnInput, returnOutput] = clear();
      $input.innerText = returnInput;
      $output.innerText = returnOutput;
      return;
    }
    case '⬅': {
      const [returnInput, returnOutput] = backSpace($input, $output);
      $input.innerText = returnInput;
      $output.innerText = returnOutput;
      return;
    }
    case '=': {
      console.log('계산결과')
      return;
    }
    case '.': {
      text = decimal($input, keyword);
      break;
    }
    default:
      text = zero($input, keyword);
  }
  inputRender(`${text}${keyword}`, $input);
  if (OPERATORS_SET.has(keyword)) {
    outputRender($input.innerText, $output);
  }

  $input.scrollLeft = 10000;
};

const $keypad = $('.keypad');

$keypad.addEventListener('click', clickHandler);
