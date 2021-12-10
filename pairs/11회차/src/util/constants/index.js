// 디스플레이 최대 입력 개수
export const LIMIT_DISPLAY_LENGTH = 69;
// 피연산자 최대 입력 개수
export const LIMIT_OPERAND_LENGTH = 15;

export const OPERATORS_SET = new Set(['+', '-', 'x', '/', '%']);

/**
 * 정규표현식
 */
export const REGEXP_OPERATOR = /(?<=\d)([+\-x/%])/g;
export const REGEXP_REMOVED_ZERO = /^0(?![.])/gm;
export const REGEXP_REMOVED_ZERO_DECIMAL = /^[0.]*(?<![1-9])|[.]/gm;

export const EMPTY = '';
export const DECIMAL = '.';
