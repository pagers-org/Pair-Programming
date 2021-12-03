const Calculator = require('./calculator.js');

// 디스플레이 최대 입력 개수
const LIMIT_DISPLAY_LENGTH = 69;
// 피연산자 최대 입력 개수
const LIMIT_OPERAND_LENGTH = 15;

const OPERATORS_SET = new Set(['+', '-', 'x', '/', '%']);

const $ = selector => document.querySelector(selector);

const clear = () => {
  return ['', ''];
};

const backSpace = ({ textContent: input }, { textContent: output }) => {
  if (!input.length && output) return ['', ''];
  if (input.length && !output) return [input.substr(0, input.length - 1), ''];

  return [input.substr(0, input.length - 1), Calculator(input.substr(0, input.length - 1))];
};

const zero = ({ textContent: input }) => {
  const inputArray = input.split('');
  // 앞자리고 0이라면 0이 지워지고 자연수가 입력된다. : pass
  // 01 -> 1
  // 앞자리가 0이고 0을 입력하면 0은 하나만 출력된다.
  // 00 -> 0
  const target = inputArray
    .reduceRight((result, value, index, array) => {
      if (OPERATORS_SET.has(value)) array.splice(1);
      return [...result, value];
    }, [])
    .reverse()
    .join('');
  let parsedInput = input.substr(0, input.length);

  // 최초로 0이 입력되는 경우
  if (!target) return '0';

  // 소수점이 가장 마지막에 존재하는 경우
  if (target.indexOf('.') === target.length - 1) return `${!target ? '0' : parsedInput}0`;

  // 앞자리가 0.인 경우
  if (target.substr(0, 2) === '0.') return `${target}0`;

  if (target[0] === '0') return '0';

  // 그 외
  return `${target}0`;
};

const inputRender = (input, $input) => {
  $input.textContent = input;
};

const outputRender = (input, $output) => {
  $output.textContent = Calculator(input);
};

const clickHandler = keyword => {
  const $input = $('.display-input');
  const $output = $('.display-output');

  const text = $input.textContent;
  if (text.length >= LIMIT_DISPLAY_LENGTH) return;

  switch (keyword) {
    case 'C': {
      const [returnInput, returnOutput] = clear();
      $input.textContent = returnInput;
      $output.textContent = returnOutput;
      return;
    }
    case '⬅': {
      const [returnInput, returnOutput] = backSpace($input, $output);
      $input.textContent = returnInput;
      $output.textContent = returnOutput;
      return;
    }
    case '0': {
      $input.textContent = zero($input);
      return;
    }
  }

  inputRender(`${text}${keyword}`, $input);
  if (OPERATORS_SET.has(keyword)) {
    outputRender($input.textContent, $output);
  }

  $input.scrollLeft = 10000;
};

// HTML 문자열
const mockHTML = `
<!-- 외부 레이아웃 -->
<div id="root">
  <!-- 입/출력 -->
  <div class="display">
    <!-- 히스토리 -->
    <div class="display-log">
      <span>Log</span>
    </div>
    <!-- 입력창 -->
    <div class="display-input"></div>
    <!-- 임시결과창 -->
    <div class="display-output"></div>
  </div>
  <!-- 키패드 -->
  <div class='keypad'>
    <!--  -->
    <div>
      <div data-digit>C</div>
      <div data-digit>⬅</div>
      <div data-digit>%</div>
      <div data-digit>/</div>
    </div>
    <!--  -->
    <div>
      <div data-digit>7</div>
      <div data-digit>8</div>
      <div data-digit>9</div>
      <div data-digit>x</div>
    </div>
    <!--  -->
    <div>
      <div data-digit>4</div>
      <div data-digit>5</div>
      <div data-digit>6</div>
      <div data-digit>-</div>
    </div>
    <!--  -->
    <div>
      <div data-digit>1</div>
      <div data-digit>2</div>
      <div data-digit>3</div>
      <div data-digit>+</div>
    </div>
    <!--  -->
    <div>
      <div data-digit>+/-</div>
      <div data-digit>0</div>
      <div data-digit>.</div>
      <div data-digit id="operator-equal">=</div>
    </div>
  </div>
</div>
<div class="modal hidden">
  <div class="modal-container">
    <ul class="modal-log">
      <li class="modal-log-list">
        <p>123+5</p>
        <p>128</p>
      </li>
      <li class="modal-log-list">
        <p>123+5</p>
        <p>128</p>
      </li>
      <li class="modal-log-list">
        <p>123+5</p>
        <p>128</p>
      </li>
      <li class="modal-log-list">
        <p>123+5</p>
        <p>128</p>
      </li>
      <li class="modal-log-list">
        <p>123+5</p>
        <p>128</p>
      </li>
      <li class="modal-log-list">
        <p>123+5</p>
        <p>128</p>
      </li>
      <li class="modal-log-list">
        <p>123+5</p>
        <p>128</p>
      </li>
      <li class="modal-log-list">
        <p>123+5</p>
        <p>128</p>
      </li>
      <li class="modal-log-list">
        <p>123+5</p>
        <p>128</p>
      </li>
    </ul>
  </div>
</div>
`;

module.exports = { clickHandler, $, mockHTML };
