/**
 * 피보나치 수는 F(0) = 0, F(1) = 1일 때,
 * 2 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 점화식입니다.
 * 2 이상의 n이 입력되었을 때, fibonacci 함수를 제작하여 n번째 피보나치 수를 반환해 주세요.
 * 예를 들어 n = 3이라면 2를 반환해주면 됩니다.
 *
 * ex_ F(4)인 경우 0 1 1 2 '3' 이므로 F(4) = 3 입니다.
 */

/**
 * 재귀
 */
const fibonacci1 = (n = 0) => {
  if (typeof n !== 'number') return;
  if (n < 2) return n;
  return fibonacci1(n - 1) + fibonacci1(n - 2);
};

// fibonacci(2) : 1 / 1 + 0
// fibonacci(3) : 2 / 1 + 1
const fibonacci2 = (n = 0) => {
  if (typeof n !== 'number') return;
  const fibo = [0, 1];
  if (fibo[n] !== undefined) return fibo[n];
  fibo[n] = fibonacci2(n - 1) + fibonacci2(n - 2);
  return fibo[n];
};

/********************************************************************* */

/**
 * waterMelon함수는 정수 n을 매개변수로 입력받습니다.>M
 * 길이가 n이고, 수박수박수…와 같은 패턴을 유지하는 문자열을 리턴하도록 함수를 완성하세요.
 *
 * ex_ waterMelon(4)이 4이면 ‘수박수박’을 리턴하고 waterMelon(3)이라면 ‘수박수’를 리턴하면 됩니다.
 */

// String.prototype.repeat(count);
const waterMelon1 = (n = 0) => {
  if (typeof n !== 'number') return;
  const wtMelon = '수박';
  const isOdd = n % 2;
  return wtMelon.repeat(n / 2) + (!isOdd ? '' : '수');
};

// for
const waterMelon2 = (n = 1) => {
  if (typeof n !== 'number') return;
  if (n === 0) return '';
  let wtMelon = '';
  for (let i = 0; i < n; i++) {
    wtMelon += i % 2 ? '박' : '수';
  }
  return wtMelon;
};
