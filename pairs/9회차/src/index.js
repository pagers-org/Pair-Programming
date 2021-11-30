import Calculator from './components/Calculator.js';

// 디스플레이 최대 입력 개수
const LIMIT_DISPLAY_LENGTH = 69;
// 피연산자 최대 입력 개수
const LIMIT_OPERAND_LENGTH = 15;

const $ = selector => document.querySelector(selector);
const render = keyword => {
  // 드래그 시 <br>가 입력된다.
  const $input = $('.display-input');
  const text = $input.innerText;
  if (text.length < LIMIT_DISPLAY_LENGTH) $input.innerText = `${text}${keyword}`;
  $input.scrollLeft = 10000;
};

const $keypad = $('.keypad');

$keypad.addEventListener('click', ({ target }) => {
  render(target.innerText);
});
