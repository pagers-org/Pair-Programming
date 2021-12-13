import { DECIMAL, EMPTY, LIMIT_OPERAND_LENGTH, REGEXP_OPERATOR } from '../constants/index.js';
import { isEmptyReturn, isOperator } from './valid.js';

/**
 *
 * @param {*} input
 * @param {*} regExp
 * @returns
 */
export const filteredOperands = input => {
  const inputStr = typeof input !== 'string' ? `${input}` : input;
  return inputStr.split(REGEXP_OPERATOR);
};

export const removeComma = target => {
  const targetStr = typeof target !== 'string' ? `${target}` : target;
  return targetStr.replace(/[,]/gi, EMPTY);
};

/**
 * 계산기 사전 작업 함수
 *
 * @returns
 */
export const validOperand = (operands, lastOperandIndex, removedZeroDecimal) => {
  const isDecimal = operands[lastOperandIndex].includes(DECIMAL);
  return isDecimal ? isEmptyReturn(removedZeroDecimal) : operands[lastOperandIndex];
};

export const parsedOperandLength = operands => {
  // input의 모든 텍스트
  const parsed = filteredOperands(operands);
  const lastOperandIndex = parsed.length - 1;
  if (isOperator(parsed[lastOperandIndex])) return operands;
  parsed.splice(lastOperandIndex, 1, parsed[lastOperandIndex].substring(0, LIMIT_OPERAND_LENGTH));
  return parsed.join(EMPTY);
};

export const parsedOperands = (input, regExp) => {
  const operands = filteredOperands(input);
  const lastOperandIndex = operands.length - 1;
  const parsed = operands[lastOperandIndex].replace(regExp, EMPTY);
  return condition => {
    const params = condition ? validOperand(operands, lastOperandIndex, parsed) : parsed;
    operands.splice(lastOperandIndex, 1, params);
    return operands.join(EMPTY);
  };
};

/**
 *
 * @param {*} value
 * @returns
 */
export const putComma = target => {
  return filteredOperands(target)
    .map(item => {
      if (item === EMPTY) return item;
      const num = +item;
      if (isNaN(num) || item.includes('.')) return item;
      return num.toLocaleString('ko-kr');
    })
    .join('');
};
