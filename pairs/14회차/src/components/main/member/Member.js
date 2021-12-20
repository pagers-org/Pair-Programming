const Member = () => {
  return `
        <section class="input-wrap">
            <form>
                <input class="input" type="text" placeholder="Input users">
                <input class="submit button" type="submit" value="Enter">
            </form>
            <ul class="users">
                <li class="user">
                    <span class="user-name">파랑</span>
                    <button class="button button-user-delete">❌</button>
                </li>
                <li class="user">
                    <span class="user-name">아벤</span>
                    <button class="button button-user-delete">❌</button>
                </li>
            </ul>
        </section>
      `;
};

export default Member;
