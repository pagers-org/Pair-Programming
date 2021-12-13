import Calculator from '../src/components/Calculator.js';
import { clickHandler } from '../src/index.js';
import { $ } from '../src/util/functions/index.js';

// jest.mock('../src/index.js');

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

// beforeEach(() => {
//   Calculator.mockClear();
// });

describe('연산', () => {
  describe('실제 숫자가 양수이고, 기호를 하나씩 사용한다.', () => {
    test('1+2 는 3이다', () => {
      expect(Calculator('1+2')).toBe(3);
    });
    test('1-2 는 -1이다', () => {
      expect(Calculator('1-2')).toBe(-1);
    });
    test('1x2 는 2이다', () => {
      expect(Calculator('1x2')).toBe(2);
    });
    test('1/2 는 0.5이다', () => {
      expect(Calculator('1/2')).toBe(0.5);
    });
    test('1%2 는 1이다', () => {
      expect(Calculator('1%2')).toBe(1);
    });
  });

  describe('실제 숫자가 음수이고, 기호를 하나씩 사용한다.', () => {
    test('-1+-2 는 -3이다', () => {
      expect(Calculator('-1+-2')).toBe(-3);
    });
    test('-1--2 는 1이다', () => {
      expect(Calculator('-1--2')).toBe(1);
    });
    test('-1x-2 는 2이다', () => {
      expect(Calculator('-1x-2')).toBe(2);
    });
    test('-1/-2 는 0.5이다', () => {
      expect(Calculator('-1/-2')).toBe(0.5);
    });
  });

  describe('피연산자가 실수이다.', () => {
    test('0.1+0.2 는 0.3이다', () => {
      expect(Calculator('0.1+0.2')).toBe(0.3);
    });
    test('0.1-0.2 는 -0.1이다', () => {
      expect(Calculator('0.1-0.2')).toBe(-0.1);
    });
    test('0.1x0.2 는 0.02이다', () => {
      expect(Calculator('0.1x0.2')).toBe(0.02);
    });
    test('0.1/0.2 는 0.5이다', () => {
      expect(Calculator('0.1/0.2')).toBe(0.5);
    });
  });

  describe('연산자 우선 순위를 고려해서 결과를 출력한다.', () => {
    test('1+2x3 는 7이다', () => {
      expect(Calculator('1+2x3')).toBe(7);
    });
    test('1-2/3 는 0.3333333이다', () => {
      expect(Calculator('1-2/3')).toBe(0.3333333);
    });
    test('1x2+3 는 5이다', () => {
      expect(Calculator('1x2+3')).toBe(5);
    });
    test('1/2-3 는 -2.5이다', () => {
      expect(Calculator('1/2-3')).toBe(-2.5);
    });
    test('1%2+3 는 4이다', () => {
      expect(Calculator('1%2+3')).toBe(4);
    });
    test('1+2%3 는 3이다', () => {
      expect(Calculator('1+2%3')).toBe(3);
    });
  });

  describe('무한소수는 소수점 이하 최대 7자리까지 반올림한다.', () => {
    test('2/3 은 0.6666667이다', () => {
      expect(Calculator('2/3')).toBe(0.6666667);
    });
    test('10/3 은 3.3333333이다', () => {
      expect(Calculator('10/3')).toBe(3.3333333);
    });
  });
});

describe('연산예외', () => {
  test('0으로 나누었을 때 : 정의되지 않은 결과입니다.', () => {
    expect(() => Calculator('10/0')).toThrow();
  });
  test('0의 나머지 연산 : 정의되지 않은 결과입니다.', () => {
    expect(() => Calculator('10%0')).toThrow();
  });
  test('음수의 나머지 연산 : 정의되지 않은 결과입니다.', () => {
    expect(() => Calculator('-3%-6')).toThrow();
  });
  test('실수의 나머지 연산 : 정의되지 않은 결과입니다.', () => {
    expect(() => Calculator('0.01%0.3')).toThrow();
  });
});

describe('입력', () => {
  beforeEach(() => {
    document.body.innerHTML = mockHTML;
  });

  /* eslint-disable no-import-assign */
  // clickHandler = jest.fn();

  describe('백스페이스 버튼을 클릭한다.', () => {
    test('아무것도 없는 경우 아무것도 하지 않는다.', () => {
      clickHandler('⬅');
      expect($('.display-input').textContent).toBe('');
    });
    test('마지막이 피연산자인 경우 뒤에서 한 자리를 지운다.', () => {
      $('.display-input').textContent = '1234';
      clickHandler('⬅');
      expect(clickHandler).toHaveBeenCalledWith('⬅');
      expect($('.display-input').textContent).toBe('123');
    });
    test('마지막이 연산자인 경우 연산자를 지운다.', () => {
      $('.display-input').textContent = '123+';
      clickHandler('⬅');
      expect($('.display-input').textContent).toBe('123');
    });
    test('결과만 존재하는 경우 결과를 지운다.', () => {
      $('.display-output').textContent = '246';
      clickHandler('⬅');
      expect($('.display-output').textContent).toBe('');
    });
    test('입력과 결과가 존재하는 경우 입력을 한 칸 지우고 다시 계산하여 결과에 출력한다.', () => {
      $('.display-input').textContent = '123+123';
      $('.display-output').textContent = '246';
      clickHandler('⬅');
      expect($('.display-input').textContent).toBe('123+12');
      expect($('.display-output').textContent).toBe('135');
    });
  });

  //   describe('클리어 버튼을 클릭한다.', () => {
  //     test('입력/출력 영역의 값을 모두 지운다.', () => {
  //       clickHandler('C');
  //       expect($('.display-input').textContent).toBe('');
  //       expect($('.display-output').textContent).toBe('');
  //     });
  //   });

  //   describe('0 버튼을 클릭한다.', () => {
  //     test('앞자리고 0이라면 0이 지워지고 자연수가 입력된다.', () => {
  //       clickHandler('0');
  //       expect(true).toBe(true);
  //     });
  //     test('앞자리가 자연수라면 0이 입력된다.', () => {
  //       $('.display-input').textContent = '4';
  //       clickHandler('0');
  //       expect($('.display-input').textContent).toBe('40');
  //     });
  //     test('앞자리가 0이고 0을 입력하면 0은 하나만 출력된다.', () => {
  //       $('.display-input').textContent = '0';
  //       clickHandler('0');
  //       expect($('.display-input').textContent).toBe('0');
  //     });
  //     test('앞자리가 0이고, 소수점을 누르면 소수로서 입력된다.', () => {
  //       $('.display-input').textContent = '0.';
  //       clickHandler('0');
  //       expect($('.display-input').textContent).toBe('0.0');
  //       clickHandler('0');
  //       expect($('.display-input').textContent).toBe('0.00');
  //     });
  //   });

  //   describe('등호 버튼을 클릭한다.', () => {
  //     test('아무것도 없는 경우 출력을 유지한다.', () => {
  //       expect(true).toBe(true);
  //     });
  //     test('마지막이 피연산자인 경우 결과 영역에 입력을 비우고 결과를 출력한다.', () => {
  //       expect(true).toBe(true);
  //     });
  //     test('마지막이 연산자인 경우 결과 영역에 입력을 비우고 결과를 출력한다.', () => {
  //       expect(true).toBe(true);
  //     });
  //     test('결과가 존재하는 경우 출력을 유지한다.', () => {
  //       expect(true).toBe(true);
  //     });
  //   });

  //   describe('피연산자가 존재하지 않을 때 연산자를 입력한 경우', () => {
  //     test('피연산자가 존재하지 않을 경우 연산자가 입력되지 않는다.', () => {
  //       for (const operator of ['+', '-', 'x', '/', '%']) {
  //         $('.display-input').textContent = operator;
  //         expect($('.display-input').textContent).toBe('');
  //       }
  //     });
  //   });

  //   describe('소수점 버튼을 클릭한다.', () => {
  //     test('소수점이 존재하는 경우 앞을 정수로 바꾼 뒤 소수점을 새로 찍는다.', () => {
  //       expect(true).toBe(true);
  //     });
  //     test('소수점이 존재하지 않는 경우 소수로써 입력된다.', () => {
  //       expect(true).toBe(true);
  //     });
  //     test('아무것도 없는 경우 0. 으로 입력된다.', () => {
  //       expect(true).toBe(true);
  //     });
  //   });

  //   describe('부호 버튼을 클릭한다.', () => {
  //     test('입력 값이 있으면 부호를 변경한다.', () => {
  //       expect(true).toBe(true);
  //     });
  //     test('입력 값이 0일 때는 입력을 유지한다.', () => {
  //       expect(true).toBe(true);
  //     });
  //   });

  //   describe('세자리 수마다 콤마를 찍는다.', () => {
  //     test('세자리 수마다 콤마를 찍는다.', () => {
  //       expect(true).toBe(true);
  //     });
  //   });

  //   describe('하나의 피연산자가 가질 수 있는 최대 자리수는 15자리다.', () => {
  //     test('자리수를 초과하게 되면 입력을 할 수 없다.', () => {
  //       expect(true).toBe(true);
  //     });
  //   });
});

// describe('이력', () => {
//   describe('연산을 수행한 순서대로 이력을 표시한다.', () => {
//     test('최근 결과 이력이 가장 위쪽에 표시된다.', () => {
//       expect(true).toBe(true);
//     });
//   });
//   describe('modal 바깥 영역을 클릭한다.', () => {
//     test('modal 창을 닫는다.', () => {
//       expect(true).toBe(true);
//     });
//   });

//   describe('이력을 클릭하면 계산기의 입력/결과 영역에 반영한다.', () => {
//     test('이력을 클릭하면 계산기의 입력/결과 영역에 반영한다.', () => {
//       expect(true).toBe(true);
//     });
//   });
// });
