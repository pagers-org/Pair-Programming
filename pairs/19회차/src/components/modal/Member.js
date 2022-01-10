const Member = ({ driver, navigators }) => {
  return `
    <section class="input-wrap">
      <div class="driver-form">
        <form>
            <input id="driver-input" class="input" type="text" placeholder="Input driver">
            <button class="submit driver-submit">➕</button>
        </form>
        <div class="driver-user">
        ${
          !driver.name
            ? ''
            : `
            <span class="user-name">${driver.name}</span>
            <button class="button button-user-delete" data-id=${driver.id}>❌</button>
            `
        }
        </div>
      </div>
      <div class="line"></div>
      <div class="navigator-form">
        <form>
            <input id="navigator-input" class="input" type="text" placeholder="Input navigator">
            <button class="submit navigator-submit">➕</button>
        </form>
        <ul class="navigator-users">
          ${navigators
            .map(
              ({ id, name }) =>
                `
              <li class="navigator-user">
                <span class="user-name">${name}</span>
                <button class="button button-user-delete"  data-id=${id}>❌</button>
              </li>
              `,
            )
            .join('')}
        </ul>
      </div>
    </section>`;
};

export default Member;
