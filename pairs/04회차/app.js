const putComma = target => {
  const num = parseFloat(target);
  if (isNaN(num)) throw new Error('숫자가 아닙니다.');
  return num.toLocaleString('ko-kr');
};

// *.test.js
// *.spec.js
// *.js

module.exports = { putComma };
