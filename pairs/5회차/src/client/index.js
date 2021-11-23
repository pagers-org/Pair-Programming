const $loading = document.querySelector('.loading');

const loading = () => {
  $loading.classList.toggle('hidden');
};

const parse = async response => {
  const { status } = response;
  try {
    let data = status !== 204 ? await response.json() : null;
    return { data, status };
  } catch (error) {
    return { status };
  }
};

const sendRequest = a => (url, data) => async next => {
  a();
  const response = await fetch(`http://localhost:3001/${url}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  });
  const result = await next(response);
  a();
  return result;
};

const postRequest = async opt => {
  return await sendRequest(loading)(opt.url, opt.data)(parse);
};

export default postRequest;
