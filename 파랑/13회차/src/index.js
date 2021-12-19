import Calculator from './components/Calculator.js';
import Modal from './components/Modal.js';
import Keypad from './components/Keypad.js';
import util from './util/functions/index.js';
import { DECIMAL, DIGIT, EMPTY, LIMIT_DISPLAY_LENGTH, OPERATOR } from './util/constants/index.js';

const { putComma, removeComma, parsedOperandLength } = util.parsed;
const { isNull, isDigit, isOperator } = util.valid;
const { $, displayRender } = util.dom;

export const clickHandler = ({ target }) => {
  if (!target.matches('div[data-digit]')) return;
  // 현재 입력된 값
  const keyword = target.innerText;

  const $input = $('.display-input');
  const $output = $('.display-output');

  if ($input.textContent.length >= LIMIT_DISPLAY_LENGTH) return;
  if ($input.textContent === '' && keyword === '=') return;
  const [input, output] = features(keyword, removeComma($input.textContent), $output);

  let outputParams = '';
  if (isOperator(keyword)) outputParams = output ?? input;
  else if (keyword === '=') {
    outputParams = putComma(Calculator(removeComma(output)));
    Modal($input.textContent, outputParams);
  } else outputParams = input;

  displayRender({ input, $input }, { output: outputParams, $output });

  $input.scrollLeft = 10000;
};

const mapKeyParsing = value => {
  if (isOperator(value)) return OPERATOR;
  if (isDigit(value)) return DIGIT;

  return value;
};

const keyMap = new Map([
  ['C', () => [EMPTY, EMPTY]],
  ['⬅', ({ input, output }) => Keypad.backSpace(input, output)],
  ['=', ({ input, output }) => [EMPTY, input || output]],
  ['+/-', ({ input, output }) => Keypad.signed(input, output)],
  [OPERATOR, ({ input, output, key }) => [`${Keypad.operators(input, output)}${key}`, null]],
  [DECIMAL, ({ input, key }) => [`${Keypad.decimal(input, key)}${key}`, null]],
  [DIGIT, ({ input, key }) => [`${Keypad.digits(input)}${key}`, null]],
]);

const features = (key, input, { innerText: output }) => {
  const [inputText, outputText] = keyMap.get(mapKeyParsing(key))({ input, output, key });
  return [putComma(parsedOperandLength(inputText)), outputText];
};

const $keypad = $('.keypad');
const $modal = $('.modal');
const $logButton = $('.display-log');

const modalToggle = () => $modal.classList.toggle('hidden');

const modalClickHandler = ({ target }) => {
  const $li = target.closest('li');

  if (isNull($li)) return modalToggle();

  const { textContent: input } = $('.modal-log-input-list', $li);
  const { textContent: output } = $('.modal-log-output-list', $li);

  if (target.matches('.modal-data-delete>span'))
    return Modal(input, output, $li.getAttribute('key'));

  if (target.matches('.modal-data-check>span'))
    displayRender(
      { input, $input: $('.display-input') },
      { output, $output: $('.display-output') },
    );

  modalToggle();
};

$keypad.addEventListener('click', clickHandler);
$logButton.addEventListener('click', modalToggle);
$modal.addEventListener('click', modalClickHandler);
