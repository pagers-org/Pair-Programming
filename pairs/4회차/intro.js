const sum = (a, b) => {
  return a + b;
};

const fn = {
  add: (num1, num2) => num1 + num2,
  makeUser: (name, age, gender) => ({ name, age, gender: undefined }),
  throwError: () => {
    throw new Error('테스트!');
  },
};

const asyncFn = {
  add: (num1, num2) => num1 + num2,
  createUser: name => {
    // 유저를 생성하는 코드를 테스트하고 싶은데,
    // 테스트할 때마다 유저가 생성되면 곤란하다.
    // 그런다고 테스트가 끝날 때마다 롤백하는 것도 문제다.
    // 그럴 때를 대비해서 mockingModule이 있다.
    console.log('실제로 사용자가 생성됩니다.');
    return {
      name,
    };
  },
  getName: callback => {
    const name = 'James';
    setTimeout(() => {
      callback(name);
    }, 3000);
  },
  getNameError: callback => {
    const name = 'James';
    setTimeout(() => {
      callback(name);
      throw new Error('!!');
    }, 3000);
  },
  getAge: () => {
    const age = 100;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(age);
      }, 3000);
    });
  },
  getAgeReject: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('error');
      }, 3000);
    });
  },
  connectUserDb: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          name: 'James',
          age: 100,
          gender: 'male',
        });
      }, 500);
    });
  },
  connectStoreDb: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          brand: 'GUCCI',
          name: 'mmmmm',
          color: 'BLACK',
        });
      }, 500);
    });
  },
  disconnectDb: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },
  disconnectStoreDb: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },
};

module.exports = { sum, fn, asyncFn };
