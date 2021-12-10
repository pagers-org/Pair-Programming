/**
 * 1. 요구사항 : 비동기 통신으로 로그인 구현하기
 * 2. baseURL : http://localhost:3001
 * 3. api
 *       - 로그인 : /login
 *       - 회원가입 : /signup
 * 4. method : POST
 * 5. 로그인 시 백엔드 결과
 *       - 성공 : {
                      "userId": 아이디,
                      "password": 비밀번호,
                      "createdAt": 생성시간,
                      "_id": 시리얼넘버
                  }
 *       - 실패 : {
                      "msg": 사유
                  }
 * 6. + 만약 아이디 여부를 사전에 체크하고 싶다면 /check/:userId
 */

export async function login(data, type) {
  const baseURL = `http://localhost:3001/${type}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  // 4xx, 5xx error not catch
  const response = await fetch(baseURL, options);
  const result = await response.json();
  const { _id } = result[0] || result;
  return _id;
}
