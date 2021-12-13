export const $ = (selector, target = document) => target.querySelector(selector);

/**
 * 현재 부모의 자식 선택자(형제)
 *
 * @param {Element} $element
 * @param {String} parent
 * @param {String} targetSelector
 * @returns
 */
export const $sibling = ($element, parent, targetSelector) =>
  $(targetSelector, $element.closest(parent));

export const displayRender = ({ input, $input }, { output, $output }) => {
  $input.innerText = input;
  $output.innerText = output;
};
