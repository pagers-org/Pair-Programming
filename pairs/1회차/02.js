// ex_ waterMelon(4)이 4이면 ‘수박수박’을 리턴하고 waterMelon(3)이라면 ‘수박수’를 리턴하면 됩니다.
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
