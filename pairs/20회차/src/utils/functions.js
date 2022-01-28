export const $ = (selector, target) => {
  if (!target) return document.querySelector(selector);
  return target.querySelector(selector);
};

export const $$ = selector => document.querySelectorAll(selector);

export const getId = () => {
  return 'xxxxxxxx'.replace(/x/g, char => {
    const random = (Math.random() * 8) | 0;
    const id = char === 'x' ? random : (random & 0x3) | 0x8;
    return id.toString(8);
  });
};
