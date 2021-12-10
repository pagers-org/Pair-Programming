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

const zero = ({ innerText: input }) => {
  // 앞자리고 0이라면 0이 지워지고 자연수가 입력된다. : pass
  // 01 -> 1
  // 앞자리가 0이고 0을 입력하면 0은 하나만 출력된다.
  // 00 -> 0
  let target = '';
  let index = -1;
  for (let i = input.length - 1; i >= 0; i--) {
    index += 1; // 0.0
    if (OPERATORS_SET.has(input[i])) break;
    target += input[i];
  }
  target = target.split('').reverse().join('');
  console.groupCollapsed(`${input}`);
  console.log('index  >>> ', index);
  console.log('target  >>> ', target);
  console.log('input.length  >>> ', input.length);
  console.groupEnd;
  return `${input.substr(0, input.length - index)}${parseFloat(target) || ''}0`;
  // 앞자리가 0이고, 소수점을 누르면 소수로서 입력된다.
};

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

  const text = $input.innerText;
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
    case '0': {
      $input.innerText = zero($input);
      return;
    }
  }

  inputRender(`${text}${keyword}`, $input);
  if (OPERATORS_SET.has(keyword)) {
    outputRender($input.innerText, $output);
  }

  $input.scrollLeft = 10000;
};

const $keypad = $('.keypad');

$keypad.addEventListener('click', clickHandler);
