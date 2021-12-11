import Calculator from './components/Calculator.js';
import Modal from './components/Modal.js';
import {
  DECIMAL,
  EMPTY,
  LIMIT_DISPLAY_LENGTH,
  LIMIT_OPERAND_LENGTH,
  OPERATORS_SET,
  REGEXP_REMOVED_ZERO,
  REGEXP_REMOVED_ZERO_DECIMAL,
} from './util/constants/index.js';
import {
  $,
  filteredOperands,
  isEmptyReturn,
  putComma,
  removeComma,
} from './util/functions/index.js';

// // 객체 / 함수 차이 : callbabl property
// const modal = Modal();
// function test() {}
// console.log(Object.getOwnPropertyDescriptors(Function));

/**
 * 계산기 사전 작업 함수
 *
 * @returns
 */
const validOperand = (operands, lastOperandIndex, removedZeroDecimal) => {
  const isDecimal = operands[lastOperandIndex].includes(DECIMAL);
  return isDecimal ? isEmptyReturn(removedZeroDecimal) : operands[lastOperandIndex];
};

const validOperandLength = operands => {
  // input의 모든 텍스트
  const parsed = filteredOperands(operands);
  const lastOperandIndex = parsed.length - 1;
  if (OPERATORS_SET.has(parsed[lastOperandIndex])) return operands;
  parsed.splice(lastOperandIndex, 1, parsed[lastOperandIndex].substring(0, LIMIT_OPERAND_LENGTH));
  return parsed.join(EMPTY);
};

const parsedOperands = (input, regExp) => {
  const operands = filteredOperands(input);
  const lastOperandIndex = operands.length - 1;
  const parsed = operands[lastOperandIndex].replace(regExp, EMPTY);
  return condition => {
    const params = condition ? validOperand(operands, lastOperandIndex, parsed) : parsed;
    operands.splice(lastOperandIndex, 1, params);
    return operands.join(EMPTY);
  };
};

const backSpace = (input, output) => {
  // input이 없는데 ouput이 있는 경우 전부 비운다.
  if (!input.length && output) return [EMPTY, EMPTY];
  // input은 있지만 ouput이 없는 경우 input을 한 자리 제거한다.
  if (input.length && !output) return [input.substr(0, input.length - 1), EMPTY];
  // input의 앞자리를 비우고 나머지 값으로 계산하여 출력한다.
  return [input.substr(0, input.length - 1), Calculator(input.substr(0, input.length - 1))];
};

/**
 * 부호 변경(+/-)
 *
 * @param {string} input
 * @returns
 */
const signed = (input, output) => {
  if (!input.length && output.length) return [-removeComma(output), -removeComma(output)];
  if (!input.length || input === '0') return ['0', EMPTY];

  const operands = filteredOperands(input);

  if (operands.length === 1) return [operands[0] * -1, EMPTY];

  const lastOperatorIndex = operands.length - 2;
  const parsed = operands
    .map((operand, index) => {
      if (index !== lastOperatorIndex) return operand;
      if (operand === '+') return '-';
      if (operand === '-') return '+';
    })
    .join(EMPTY);
  return [parsed, Calculator(parsed)];
};

const operators = (input, output) => {
  if (!input.length && output.length) return `${output}`;
  // 피연산자가 없는 경우
  if (!input.length) return '0';
  // 수식은 있는데 마지막 값이 연산자인지 체크
  if (OPERATORS_SET.has(input[input.length - 1])) return input.substr(0, input.length - 1);
  return input;
};

const decimal = input => {
  const operands = parsedOperands(input, REGEXP_REMOVED_ZERO_DECIMAL);
  return operands(true);
};

const digits = input => {
  const operands = parsedOperands(input, REGEXP_REMOVED_ZERO);
  return operands();
};

const displayRender = ({ input, $input }, { output, $output }) => {
  $input.innerText = input;
  $output.innerText = output;
};

const clickHandler = ({ target }) => {
  if (!target.matches('div[data-digit]')) return;
  // 현재 입력된 값
  const keyword = target.innerText;

  const $input = $('.display-input');
  const $output = $('.display-output');

  if ($input.textContent.length >= LIMIT_DISPLAY_LENGTH) return;
  if ($input.textContent === '' && keyword === '=') return;
  const [input, output] = features(keyword, removeComma($input.textContent), $output);

  let outputParams = '';
  if (OPERATORS_SET.has(keyword)) outputParams = output ?? input;
  else if (keyword === '=') outputParams = output;
  else outputParams = input;

  displayRender(
    { input, $input },
    { output: putComma(Calculator(removeComma(outputParams))), $output },
  );

  $input.scrollLeft = 10000;
};

const features = (key, input, { innerText: output }) => {
  let inputText = '';
  let outputText = '';

  switch (key) {
    case 'C':
      return [EMPTY, EMPTY];
    case '⬅':
      [inputText, outputText] = backSpace(input, output);
      break;
    case '=':
      [inputText, outputText] = input === '' ? [EMPTY, output] : [EMPTY, input];
      Modal(putComma(validOperandLength(input)), putComma(Calculator(removeComma(outputText))));
      break;
    case '+/-':
      [inputText, outputText] = signed(input, output);
      break;
    case '+':
    case '-':
    case 'x':
    case '/':
    case '%':
      [inputText, outputText] = [`${operators(input, output)}${key}`, null];
      break;
    case DECIMAL:
      [inputText, outputText] = [`${decimal(input, key)}${key}`, null];
      break;
    default:
      [inputText, outputText] = [`${digits(input)}${key}`, null];
  }

  return [putComma(validOperandLength(inputText)), outputText];
};

const $keypad = $('.keypad');
$keypad.addEventListener('click', clickHandler);

const $modal = $('.modal');
const $logButton = $('.display-log');
$logButton.addEventListener('click', () => {
  $modal.classList.toggle('hidden');
});
$modal.addEventListener('click', ({ target }) => {
  if (target.matches('ul li')) modalClickHandler(target);
  $modal.classList.toggle('hidden');
});

const modalClickHandler = target => {
  const { textContent: input } = $('.modal-log-input-list', target);
  const { textContent: output } = $('.modal-log-output-list', target);

  displayRender({ input, $input: $('.display-input') }, { output, $output: $('.display-output') });
};
