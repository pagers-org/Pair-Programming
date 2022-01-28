// 1. 빈 값인지 검사한다. -enter
// 2. 앞 뒤 공백을 trim 한다 (단 내부 공백 허용) -change, enter
// 3. 특수문자는 제한 없이 사용이 가능하다. -change, enter
// 4. 글자수는 10자내로 한다. min: 2글자, max: 10글자 -change, enter
// 5. 중복은 허용하지 않는다. -enter

export const isValidateName = (name, state) => {
  // 2번
  const copiedName = name.trim();
  // 4번
  if (copiedName.length < 2 || copiedName.length > 10) return false;
  // 5번
  if (isDuplicatedName(copiedName, state)) return false;
  // 정상
  return true;
};

const isDuplicatedName = (name, { driver, navigators }) => {
  if (name === driver.name) return true;
  for (let navigator of navigators) if (name === navigator.name) return true;
  return false;
};

// 1. 분의 max 60, 초의 max: 59 (60분)
// 2. 분의 min 00, 초의 min 00 (0분)
// 3. 숫자만 입력 가능

// 0 => 00:00
// 1 => 01:00
// 9 => 09:00
// 12 => 12:00
// 61 => 60:00
// 1:1 => 01:01
// 1:00 => 01:00
// 60:59 => 60:00

// 한 자리만 입력하는 경우
// 두 자리를 입력하는 경우 => 60보다 큰 경우

// 한자리:한자리를 입력하는 경우
// 한자리:두자리를 입력하는 경우 => 59보다 큰 경우
// 두자리:한자리를 입력하는 경우 => 60보다 큰 경우

// 두자리:두자리를 입력하는 경우 => 60보다 큰 경우 / 59보다 큰 경우

export const isValidateTimer = value => {
  const token = value
    .split(':')
    .map(item => (item ? `${parseInt(item)}` : '00'))
    .slice(0, 2);
  const result = token.map((item, index) => {
    if (item < 0) return '00';
    if (index === 0 && item > 60) return '60';
    if (index === 1 && token[0] >= 60) return '00';
    if (index === 1 && item > 59) return '59';

    return 0 < item && item < 10 ? `0${+item}` : item.length === 1 ? `${item}0` : item;
  });

  return (result.length === 1 ? [...result, '00'] : result).join(':');
};
