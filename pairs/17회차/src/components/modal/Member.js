const Member = ({ member }) => {
  return `
    <section class="input-wrap">
      <div class="driver-form">
        <form>
            <input id="driver-input" class="input" type="text" placeholder="Input driver">
            <button class="submit driver-submit">➕</button>
        </form>
        <div class="driver-user">
          <span class="user-name">${member.driver}</span>
          <button class="button button-user-delete">❌</button>
        </div>
      </div>
      <div class="line"></div>
      <div class="navigator-form">
        <form>
            <input id="navigator-input" class="input" type="text" placeholder="Input navigator">
            <button class="submit navigator-submit">➕</button>
        </form>
        <ul class="navigator-users">
            ${member.navigator
              .map(
                name =>
                  `
                <li class="navigator-user">
                    <span class="user-name">${name}</span>
                    <button class="button button-user-delete">❌</button>
                </li>
                `,
              )
              .join('')}
        </ul>
      </div>
    </section>`;
};

export default Member;
