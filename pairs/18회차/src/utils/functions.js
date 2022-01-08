export const $ = (selector, target) => {
  if (!target) return document.querySelector(selector);
  return target.querySelector(selector);
};

export const $$ = selector => document.querySelectorAll(selector);
