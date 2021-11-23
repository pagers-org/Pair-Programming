export const renderForm = type => {
  const template = `
  <div class="app-title">
    <h1>짝 프로그래밍</h1>
  </div>

  <div class="login-form">
  ${
    type === 'login'
      ? `
      <div class="control-group">
        <input type="text" class="login-field" value="" placeholder="username" id="login-name">
        <label class="login-field-icon fui-user" for="login-name"></label>
      </div>

      <div class="control-group">
        <input type="password" class="login-field" value="" placeholder="password" id="login-pass">
        <label class="login-field-icon fui-lock" for="login-pass"></label>
      </div>

      <a id="loginButton" class="btn btn-primary btn-large btn-block" href="#">로그인!</a>
      <p data-component="signup">회원가입을 하시겠어요?</p>`
      : `
      <div class="control-group">
        <input type="text" class="login-field" value="" placeholder="username" id="signup-name">
        <label class="login-field-icon fui-user" for="signup-name"></label>
      </div>

      <div class="control-group">
        <input type="password" class="login-field" value="" placeholder="password" id="signup-pass">
        <label class="login-field-icon fui-lock" for="signup-pass"></label>
      </div>

      <div class="control-group">
        <input type="password" class="login-field" value="" placeholder="password-check" id="signup-pass-check">
        <label class="login-field-icon fui-lock" for="signup-pass-check"></label>
      </div>

      <a id="signupButton" class="btn btn-primary btn-large btn-block" href="#">회원가입!!</a>
      <p data-component="login">로그인을 하시겠어요?</p>`
  }
  </div>
  `;

  document.querySelector('.container').innerHTML = template;

  return type;
};

export default renderForm;
