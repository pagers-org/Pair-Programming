import { EMPTY, OPERATORS_SET, REGEXP_DIGIT } from '../constants/index.js';

/**
 *
 * @param {*} value
 * @returns
 */
export const isNull = value => value === null || value === undefined;

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

// export const isDigit = value => value.search(REGEXP_DIGIT);
export const isDigit = value => REGEXP_DIGIT.test(value);

// export const isDigit = value => new Set(REGEXP_DIGIT).has(value);

export const isOperator = value => OPERATORS_SET.has(value);
