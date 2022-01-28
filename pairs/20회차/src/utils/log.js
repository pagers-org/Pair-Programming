export const logAction = result => {
  console.log(
    `%ctype: %c${result.type}%c ${
      result.data ? JSON.stringify(result.data, null, 2) : ''
    }%c\nnew state:%c ${JSON.stringify(result.state, null, 2) ?? result.subscribers}`,
    'color: gray',
    'color: orange; font-weight: bold',
    'color: salmon',
    'color: gray',
    'color: salmon',
  );
  
  return result;
};
