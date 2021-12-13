import Calculator from './Calculator.js';
import {
  EMPTY,
  REGEXP_REMOVED_ZERO,
  REGEXP_REMOVED_ZERO_DECIMAL,
} from '../util/constants/index.js';
import util from '../util/functions/index.js';

const { filteredOperands, parsedOperands, removeComma } = util.parsed;
const { isOperator } = util.valid;

const Keypad = () => {
  return {
    backSpace: (input, output) => {
      // input이 없는데 ouput이 있는 경우 전부 비운다.
      if (!input.length && output) return [EMPTY, EMPTY];
      // input은 있지만 ouput이 없는 경우 input을 한 자리 제거한다.
      if (input.length && !output) return [input.substr(0, input.length - 1), EMPTY];
      // input의 앞자리를 비우고 나머지 값으로 계산하여 출력한다.
      return [input.substr(0, input.length - 1), Calculator(input.substr(0, input.length - 1))];
    },
    /**
     * 부호 변경(+/-)
     *
     * @param {string} input
     * @returns
     */
    signed: (input, output) => {
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
    },

    operators: (input, output) => {
      if (!input.length && output.length) return `${output}`;
      // 피연산자가 없는 경우
      if (!input.length) return '0';
      // 수식은 있는데 마지막 값이 연산자인지 체크
      if (isOperator(input[input.length - 1])) return input.substr(0, input.length - 1);
      return input;
    },

    decimal: input => {
      const operands = parsedOperands(input, REGEXP_REMOVED_ZERO_DECIMAL);
      return operands(true);
    },

    digits: input => {
      const operands = parsedOperands(input, REGEXP_REMOVED_ZERO);
      return operands();
    },
  };
};

export default Keypad();
