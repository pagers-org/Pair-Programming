const Calculator = require('./calculator.js');

// 디스플레이 최대 입력 개수
const LIMIT_DISPLAY_LENGTH = 69;
// 피연산자 최대 입력 개수
const LIMIT_OPERAND_LENGTH = 15;

const OPERATORS_SET = new Set(['+', '-', 'x', '/', '%']);

const $ = selector => document.querySelector(selector);

const backSpace = ({ innerText: input }, { innerText: output }) => {
  if (!input.length && output) return ['', ''];
  if (input.length && !output) return [input.substr(0, input.length - 1), ''];

  return [input.substr(0, input.length - 1), Calculator(input.substr(0, input.length - 1))];
};

const clear = keyword => {
  // 입력/출력 영역의 값을 모두 지운다.
};

const inputRender = (input, $input) => {
  $input.innerText = input;
};

const outputRender = (input, $output) => {
  $output.innerText = Calculator(input);
};

const clickHandler = keyword => {
  const $input = $('.display-input');
  const $output = $('.display-output');

  const text = $input.innerText;
  // if (text.length >= LIMIT_DISPLAY_LENGTH) return;

  if (keyword === '⬅') {
    const [returnInput, returnOutput] = backSpace($input, $output);
    $input.innerText = returnInput;
    $output.innerText = returnOutput;
    return;
  }

  inputRender(`${text}${keyword}`, $input);
  if (OPERATORS_SET.has(keyword)) {
    outputRender($input.innerText, $output);
  }

  $input.scrollLeft = 10000;
};

module.exports = { clickHandler, $ };
