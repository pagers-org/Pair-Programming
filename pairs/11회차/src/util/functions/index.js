import { EMPTY, REGEXP_OPERATOR } from '../constants/index.js';

export const $ = (selector, target = document) => target.querySelector(selector);

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
 *
 * @param {*} value
 * @returns
 */
export const putComma = target => {
  return filteredOperands(target)
    .map(item => {
      if (item === EMPTY) return item;
      const num = +item;
      if (isNaN(num)) return item;
      return num.toLocaleString('ko-kr');
    })
    .join('');
};

/**
 *
 * @param {*} value
 * @returns
 */

export const isEmpty = value => value === EMPTY;

/**
 *
 * @param {*} value
 * @returns
 */
export const isEmptyReturn = value => (isEmpty(value) ? '0' : value);
