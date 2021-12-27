const Member = ({ member }) => {
  return `
    <section class="input-wrap">
        <form>
            <input class="input" type="text" placeholder="Input users">
            <button class="submit">추가</button>
        </form>
        <ul class="users">
            ${member
              .map(
                name =>
                  `
                <li class="user">
                    <span class="user-name">${name}</span>
                    <button class="button button-user-delete">❌</button>
                </li>
                `,
              )
              .join('')}
        </ul>
    </section>`;
};

export default Member;
