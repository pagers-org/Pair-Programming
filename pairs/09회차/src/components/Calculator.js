const Calculator = expr => {
  const validate = value => {};

  const calculate = (left, operator, right) => {
    let parseRight = 0;
    // 나머지 연산일 때 음수인가?
    // ''              실수인가?
    switch (operator) {
      case '+':
        return left + (right || 0);
      case '-':
        return left - (right || 0);
      case 'x':
        parseRight = right === 0 ? 0 : right || 1;
        return left * parseRight;
      case '/':
        parseRight = right === 0 ? 0 : right || 1;
        if (parseRight === 0) throw new Error('정의되지 않은 결과입니다.');
        return left / parseRight;
      case '%': {
        parseRight = right === 0 ? 0 : right || 1;
        if (parseRight === 0) throw new Error('정의되지 않은 결과입니다.');
        if (left < 0 || parseRight < 0) throw new Error('정의되지 않은 결과입니다.');
        if (`${left}`.includes('.') || `${parseRight}`.includes('.'))
          throw new Error('정의되지 않은 결과입니다.');
        return left % parseRight;
      }
    }
  };

  const parse = expr => {
    // 대괄호를 괄호로 감싸면 그룹핑이 된다.
    const OPERATORS = { x: 2, '/': 2, '%': 2, '+': 1, '-': 1 };
    const expressions = expr.split(/(?<=\d)([+\-x/%])/gi);
    if (expressions.length <= 1) return '';
    while (expressions.length > 1) {
      let index = expressions.findIndex(item => OPERATORS[item] === 2);
      if (index === -1) index = expressions.findIndex(item => OPERATORS[item] === 1);

      const result = calculate(
        +expressions[index - 1],
        expressions[index],
        parseFloat(expressions[index + 1]),
      );
      expressions.splice(index - 1, 3, result);
    }

    return +Number(expressions[0]).toFixed(7);
  };

  return parse(expr);
};

// module.exports = Calculator;
export default Calculator;
