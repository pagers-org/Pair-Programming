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
  // input이 없는데 ouput이 있는 경우 전부 비운다.
  if (!input.length && output) return ['', ''];
  // input은 있지만 ouput이 없는 경우 input을 한 자리 제거한다.
  if (input.length && !output) return [input.substr(0, input.length - 1), ''];

  // input의 앞자리를 비우고 나머지 값으로 계산하여 출력한다.
  return [input.substr(0, input.length - 1), Calculator(input.substr(0, input.length - 1))];
};

const zero = ({ innerText: input }) => {
  const inputArray = input.split('');
  // 앞자리고 0이라면 0이 지워지고 자연수가 입력된다. : pass
  // 01 -> 1
  // 앞자리가 0이고 0을 입력하면 0은 하나만 출력된다.
  // 00 -> 0
  const target = inputArray
    .reduceRight((result, value, index, array) => {
      if (OPERATORS_SET.has(value)) array.splice(1);
      return [...result, value];
    }, [])
    .reverse()
    .join('');
  let parsedInput = input.substr(0, input.length);

  // 최초로 0이 입력되는 경우
  if (!target) return '0';

  // 소수점이 가장 마지막에 존재하는 경우
  if (target.indexOf('.') === target.length - 1) return `${!target ? '0' : parsedInput}0`;

  // 앞자리가 0.인 경우
  if (target.substr(0, 2) === '0.') return `${target}0`;

  if (target[0] === '0') return '0';

  // 그 외
  return `${target}0`;
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

  const text = $input.textContent;
  if (text.length >= LIMIT_DISPLAY_LENGTH) return;

  switch (keyword) {
    case 'C': {
      const [returnInput, returnOutput] = clear();
      $input.textContent = returnInput;
      $output.textContent = returnOutput;
      return;
    }
    case '⬅': {
      const [returnInput, returnOutput] = backSpace($input, $output);
      $input.textContent = returnInput;
      $output.textContent = returnOutput;
      return;
    }
    case '0': {
      $input.textContent = zero($input);
      return;
    }
  }

  inputRender(`${text}${keyword}`, $input);
  if (OPERATORS_SET.has(keyword)) {
    outputRender($input.textContent, $output);
  }

  $input.scrollLeft = 10000;
};

const $keypad = $('.keypad');

$keypad.addEventListener('click', clickHandler);
