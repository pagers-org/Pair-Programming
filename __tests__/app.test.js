const { putComma } = require('../pairs/4회차/app.js');

// 관리의 용이성, 가독성

// 보일러 플레이트(Boiler Plate) : 폴더 구조에 따른 테스트 코드 분리
// 단위 테스트 구조 정립 : Unit에 따라 테스트를 분리하기
// - User 단위 테스트(User.test.js) : describe('Login'), Register, Validation, Check ...
// - behavior 행위 테스트 : 아이디를 입력한다. DB에 연결한다.

// 프로젝트 규모, 프로젝트의 복잡성
// ----------------------------- 애자일
// 작은 애플리케이션(규모 row, 복잡성 row) : 단일(로그인 모듈)
// 작은 애플리케이션(규모 row, 복잡성 high) : CRUD(게시판 모듈) = 관리 앱 복잡성을 해소하는게 우선
// 큰 애플리케이션(규모 high, 복잡성 row) : 외부 API x 순수 어플리케이션 포트폴리오(Clone App)
// 큰 애플리케이션(규모 high, 복잡성 high) : Service App

describe('숫자를 입력하면...', () => {
  test('1. 세 자리수마다 콤마를 찍는다.', () => {
    expect(putComma(10000)).toBe('10,000');
    // expect(putComma(Number(000010000))).toBe('10,000');
  });
  test('2. 소수라면 앞자리에만 콤마를 찍는다.', () => {
    expect(putComma(12345.01234)).toBe('12,345.012');
    expect(putComma(345.01234)).toBe('345.012');
  });
});

describe('문자를 입력하면...', () => {
  test('1. 문자가 숫자로 형변환이 되면 세 자리수마다 콤마를 찍는다.', () => {
    expect(putComma('10000')).toBe('10,000');
    expect(putComma('000010000')).toBe('10,000');
  });
  test('2. 형변환이 숫자가 아닌 경우, 에러를 출력한다.', () => {
    expect(() => putComma('abcde')).toThrow();
    expect(() => putComma(null)).toThrow();
    expect(() => putComma(undefined)).toThrow();
    expect(() => putComma(new Object())).toThrow();
    expect(() => putComma(new Array())).toThrow();
    expect(() => putComma(new RegExp())).toThrow();
    expect(() => putComma(new Date())).toThrow();
  });
  test('3. "10000일"을 넣으면 10,000을 반환한다.', () => {
    expect(putComma('10000일')).toBe('10,000');
    expect(() => putComma('일00001')).toThrow();
  });
});

// 의존성이 강하다. = 복잡성이 높다.
// a 모듈을 실행할 때, b 모듈을 거치고 c모듈을 거쳐서 d 모듈에서 허락을 받아야만 한다.
// login -> id check, password check, email auth, personal info access, db connect
// function login({id, password}){
//     // ...
// }

// login Test

// 10 , '10' '십', '열' => 숫자 10;
// 결과가 다르다???
// 입력이 같으면 결과도 같아야 한다. 왜? 예측이 가능하고, 해당 기능을 어디에 붙여도 동일하게 동작하기 때문에.

// 스파게티 코드
