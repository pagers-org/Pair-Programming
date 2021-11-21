// ex_ F(4)인 경우 0 1 1 2 '3' 이므로 F(4) = 3 입니다.
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
