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

/**
 *
 * @returns
 */
export const createUUID = () => {
  let dateTime = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, callback => {
    const randomNumber = (dateTime + Math.random() * 16) % 16 | 0;
    dateTime = Math.floor(dateTime / 16);
    return (callback == 'x' ? randomNumber : (randomNumber & 0x3) | 0x8).toString(16);
  });
};
