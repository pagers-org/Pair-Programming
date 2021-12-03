import { EMPTY } from '../constants/index.js';

export const $ = selector => document.querySelector(selector);

/**
 *
 * @param {*} input
 * @param {*} regExp
 * @returns
 */
export const filteredOperands = (input, regExp) => input.split(regExp);

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
