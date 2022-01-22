export const $ = (selector, target) => {
  if (!target) return document.querySelector(selector);
  return target.querySelector(selector);
};

export const $$ = selector => document.querySelectorAll(selector);

export const getId = () => {
  return 'xxxxxxxx'.replace(/x/g, c => {
    const random = (Math.random() * 8) | 0;
    const id = c == 'x' ? random : (random & 0x3) | 0x8;
    return id.toString(8);
  });
};
