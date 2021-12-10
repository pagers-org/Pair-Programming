/**
 * 아벤님 회고
 * 1. 우선 순위를 못 찾는다.
 *  => 우선 순위를 찾는 기능을 구현해야 한다.
 * 2. findIndex 로직의 수정이 필요해 보인다.
 *  => 해당 함수는 첫 번째 동일한 값만 찾으므로
 *     다른 위치의 동일 연산자에 대해 탐색하도록 수정이 필요하다.
 *
 * ===> 의존하는 느낌이 있다. 생각을 하고 의견을 냈어야 했는데 조금 부족했었다.
 * ===> 회고로 나온 개선이 필요한 부분에 대해서 의견 생각해오기,
 *      의견을 듣고 혼자서도 전개가 가능하다고 확신할 때 '네'라고 답하기,
 *
 *
 * 파랑 회고
 * 1. 음수 처리가 필요하다.
 *  => 정규표현식으로 parse하는 부분에서 음수가 들어오게 되면 로직이 틀어진다.
 * 2. 실시간으로 연산을 반영해야 한다.
 *  => 구조, 데이터 flow가 정립되어야 한다.
 * 3. for문을 개선시켜야 한다.
 *  => 연산식이 얼마나 입력될 지 모르므로 for-break는 유연성이 떨어진다.
 *
 * ===> 테스트케이스 수립이 약하다. 사전 협의 없이 생각을 진행한 것... 태도가 안 좋다.
 * ===> 객체 제어, 반복문이나 functional Component에 대해 공부하기
 *      개선해야 하는 부분과 확장이 필요한 부분을 정리하기
 *      테스트 케이스를 진행할 스텁 함수 구현에 대해 생각해보기
 *      7회차 내용을 기준으로 README를 정리해서 회차별 진행도를 시각화하기
 */
const Calculator = expr => {
  const OPERATORS = ['*', '/', '%', '+', '-'];

  const calculate = (left, operator, right) => {
    switch (operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      case '%':
        return left % right;
    }
  };

  const parse = expr => {
    // 대괄호를 괄호로 감싸면 그룹핑이 된다.
    const expressions = expr.split(/([+\-*\\/%])/);
    let result = 0;
    for (const operator of OPERATORS) {
      let idx = expressions.findIndex(sign => {
        return sign === operator;
      });
      if (idx !== -1) {
        result = calculate(
          +expressions[idx - 1],
          expressions[idx],
          +expressions[idx + 1],
        );
        break;
      }
    }
    return result;
  };

  return parse(expr);
};

export default Calculator;
