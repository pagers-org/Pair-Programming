import Calculator from './components/Calculator.js';
import {
  DECIMAL,
  EMPTY,
  LIMIT_DISPLAY_LENGTH,
  LIMIT_OPERAND_LENGTH,
  OPERATORS_SET,
  REGEXP_OPERATOR,
  REGEXP_REMOVED_ZERO,
  REGEXP_REMOVED_ZERO_DECIMAL,
} from './util/constants/index.js';
import { $, filteredOperands, isEmptyReturn } from './util/functions/index.js';

/**
 * 계산기 사전 작업 함수
 *
 * @returns
 */
const validOperand = (operands, lastOperandIndex, removedZeroDecimal) => {
  const isDecimal = operands[lastOperandIndex].includes(DECIMAL);
  return isDecimal ? isEmptyReturn(removedZeroDecimal) : operands[lastOperandIndex];
};

const parsedOperands = (input, regExp) => {
  const operands = filteredOperands(input, REGEXP_OPERATOR);
  const lastOperandIndex = operands.length - 1;
  const parsed = operands[lastOperandIndex].replace(regExp, EMPTY);
  return condition => {
    const params = condition ? validOperand(operands, lastOperandIndex, parsed) : parsed;
    operands.splice(lastOperandIndex, 1, params);
    return operands.join(EMPTY);
  };
};

const clear = () => [EMPTY, EMPTY];

const backSpace = ({ innerText: input }, { innerText: output }) => {
  // input이 없는데 ouput이 있는 경우 전부 비운다.
  if (!input.length && output) return [EMPTY, EMPTY];
  // input은 있지만 ouput이 없는 경우 input을 한 자리 제거한다.
  if (input.length && !output) return [input.substr(0, input.length - 1), EMPTY];
  // input의 앞자리를 비우고 나머지 값으로 계산하여 출력한다.
  return [input.substr(0, input.length - 1), Calculator(input.substr(0, input.length - 1))];
};

const signed = ({ innerText: input }) => {
  if (!input.length || input === '0') return ['0', EMPTY];
  const operands = filteredOperands(input, REGEXP_OPERATOR);
  if (operands.length === 1) return [operands[0] * -1, EMPTY];

  const lastOperatorIndex = operands.length - 2;
  operands[lastOperatorIndex] =
    operands[lastOperatorIndex] === '+'
      ? '-'
      : operands[lastOperatorIndex] === '-'
      ? '+'
      : operands[lastOperatorIndex];
  const parsed = operands.join(EMPTY);
  return [parsed, Calculator(parsed)];
};

const operators = ({ innerText: input }) => {
  // 피연산자가 없는 경우
  if (!input.length) return '0';
  // 수식은 있는데 마지막 값이 연산자인지 체크
  if (OPERATORS_SET.has(input[input.length - 1])) return input.substr(0, input.length - 1);
  return input;
};

const decimal = ({ innerText: input }) => {
  const operands = parsedOperands(input, REGEXP_REMOVED_ZERO_DECIMAL);
  return operands(true);
};

const digits = ({ innerText: input }) => {
  const operands = parsedOperands(input, REGEXP_REMOVED_ZERO);
  return operands();
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

  let text = $input.textContent;
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
    case '=': {
      console.log('계산결과');
      return;
    }
    case '+/-': {
      const [returnInput, returnOutput] = signed($input);
      $input.textContent = returnInput;
      $output.textContent = returnOutput;
      return;
    }
    case '+':
    case '-':
    case 'x':
    case '/':
    case '%':
      text = operators($input);
      break;
    case DECIMAL: {
      text = decimal($input, keyword);
      break;
    }
    default:
      text = digits($input);
  }

  inputRender(`${text}${keyword}`, $input);
  if (OPERATORS_SET.has(keyword)) {
    outputRender($input.textContent, $output);
  }

  $input.scrollLeft = 10000;
};

const $keypad = $('.keypad');

$keypad.addEventListener('click', clickHandler);
