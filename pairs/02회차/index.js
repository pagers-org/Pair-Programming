const validatedPassword = (password, passwordCheck) => {
  // 정규표현식
  const regexp = /(?=.*[!@#$?])(?=.*[a-z])(?=.*\d)[a-z!@#$?\d]{8,}/;
  const isValidated = regexp.test(password);
  if (!isValidated) return alert('비밀번호 형식이 올바르지 않습니다.');
  const isEquals = password === passwordCheck;
  if (!isEquals) return alert('비밀번호를 확인해주세요.');
  return true;
};

// 작성할 함수
function signup(id, password, passwordCheck) {
  // 조건 : 비밀번호만 검증
  // - 8자리 이상
  // - 특수문자 하나(!, @, #, $, ?)
  // - 영문자, 숫자 하나 이상
  console.log(validatedPassword(password, passwordCheck));
}

const $loginButton = document.getElementById('loginButton');
$loginButton.addEventListener('click', event => {
  event.preventDefault();
  const $id = document.getElementById('login-name').value;
  const $password = document.getElementById('login-pass').value;
  const $passwordCheck = document.getElementById('login-pass-check').value;

  console.log($id, $password, $passwordCheck);

  signup($id, $password, $passwordCheck);
});
