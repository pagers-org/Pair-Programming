// const { sum, fn, asyncFn } = require('../pairs/4회차/intro.js');

// describe('동등 비교', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
//   test('이름과 나이를 전달 받아 객체를 반환한다.', () => {
//     expect(fn.makeUser('james', 100)).toStrictEqual({
//       name: 'james',
//       age: 100
//     })
//   })
//   test('이름과 나이를 전달 받아 객체를 반환한다.', () => {
//     expect(fn.makeUser('james', 100)).toEqual({
//       name: 'james',
//       age: 100
//     })
//   })
// });
/**************************************************************************** */
// toBe 동등 연산
// toEqual 느슨한 일치 연산
// toStrictEqual 엄격한 일치 연산
// toBeClose 근사값
/**************************************************************************** */
// toBeNull
// toBeUndefined
// toBeDefined
/**************************************************************************** */
// toBeTruthy
// toBeFalsy
/**************************************************************************** */
// toBeGreaterThan
// toBeGreaterThanOrEqual
// toBeLessThan
// toBeLessThanOrEqual
/**************************************************************************** */
// toMatch 정규표현식
/**************************************************************************** */
// toContain 포함여부(Array)
/**************************************************************************** */
// describe('에러', () => {
//   test('에러를 출력한다.', () => {
//     expect(() => fn.throwError()).toThrow();
//   });
//   test('에러 메세지 "테스트!" 를 출력한다.', () => {
//     expect(() => fn.throwError()).toThrow('테스트!');
//   });
//   test('에러 메세지 "테스트"는 틀리다.', () => {
//     expect(() => fn.throwError()).toThrow('1234');
//   });
// });
/**************************************************************************** */
// describe('비동기(콜백)', () => {
//   // 그런데 3초 후에 작동하는게 아님?
//   test('3초 후에 전달 받은 이름은 `James`다.', () => {
//     function callback(name){
//       expect(name).toBe('James');
//     }
//     asyncFn.getName(callback);
//   });
//   // 이것도 성공함
//   test('3초 후에 전달 받은 이름은 `James`다.', () => {
//     function callback(name){
//       expect(name).toBe('Tom');
//     }
//     asyncFn.getName(callback);
//   });
//   // jest는 기다리지 않고 진행한다. 그럼 아래로 해야한다.
//   test('3초 후에 전달 받은 이름은 `James`다.', done => {
//     function callback(name){
//       expect(name).toBe('James');
//       done();
//     }
//     asyncFn.getName(callback);
//   });
//   test('3초 후에 전달 받은 이름은 `James`다.', done => {
//     function callback(name){
//       expect(name).toBe('James');
//       // done();  // 이 경우 timeout
//     }
//     asyncFn.getName(callback);
//   });
//   // 에러를 잡고 싶다면 try catch 사용하기
//   test('3초 후에 전달 받은 이름은 `James`다.', done => {
//     function callback(name){
//       try {
//         expect(name).toBe('James');
//         done();
//       } catch (error) {
//         done();
//       }
//     }
//     asyncFn.getNameError(callback);
//   });
// });
/**************************************************************************** */
// // Promise는 jest가 기다려준다.
// describe('비동기(프로미스)', () => {
//   // 이렇게하면 틀리든 맞든 무조건 통과된다.
//   test('3초 후에 전달 받은 이름은 `James`다.', () => {
//     asyncFn.getAge().then(age => {
//       expect(age).toBe(1000);
//     });
//   });
//   test('3초 후에 전달 받은 이름은 `James`다.', () => {
//     return asyncFn.getAge().then(age => {
//       expect(age).toBe(31);
//     });
//   });
//   // 쉽게 하고 싶다면 resolves, rejects를 사용하자.
//   test('3초 후에 전달 받은 이름은 `James`다.', () => {
//     return expect(asyncFn.getAge()).resolves.toBe(100);
//   });
//   test('3초 후에 전달 받은 이름은 `James`다.', () => {
//     return expect(asyncFn.getAgeReject()).rejects.toMatch('error');
//   });
// });
/**************************************************************************** */
// // async/await는 jest가 기다려준다.
// describe('비동기(async/await)', () => {
//   // 이렇게하면 틀리든 맞든 무조건 통과된다.
//   test('3초 후에 전달 받은 이름은 `James`다.', async () => {
//     const age = await asyncFn.getAge();
//     expect(age).toBe(1000);
//   });
//   test('3초 후에 전달 받은 이름은 `James`다.', () => {
//     const age = await asyncFn.getAge();
//     expect(age).toBe(100);
//   });
//   // 쉽게 하고 싶다면 resolves, rejects를 사용하자.
//   test('3초 후에 전달 받은 이름은 `James`다.', async () => {
//     await expect(asyncFn.getAge()).resolves.toBe(100);
//   });
//   test('3초 후에 전달 받은 이름은 `James`다.', async () => {
//     await expect(asyncFn.getAgeReject()).rejects.toMatch('error');
//   });
// });
/**************************************************************************** */
// // 테스트 전후 작업 : clear해줘야 한다.
// let num = 0;
// test('', () => {
//   num = fn.add(num, 1);
//   expect(num).toBe(1)
// });
// test('', () => {
//   num = fn.add(num, 2);
//   expect(num).toBe(2)
// });
// test('', () => {
//   num = fn.add(num, 3);
//   expect(num).toBe(3)
// });
// test('', () => {
//   num = fn.add(num, 4);
//   expect(num).toBe(4)
// });

// // 테스트 전에 처리할 작업
// beforeEach(() => {
//   num = 0;
// });

// test('', () => {
//   num = fn.add(num, 1);
//   expect(num).toBe(1)
// });
// test('', () => {
//   num = fn.add(num, 2);
//   expect(num).toBe(2)
// });
// test('', () => {
//   num = fn.add(num, 3);
//   expect(num).toBe(3)
// });
// test('', () => {
//   num = fn.add(num, 4);
//   expect(num).toBe(4)
// });

// // 테스트 후에 처리할 작업
// afterEach(() => {
//   num = 0;
// });
/**************************************************************************** */
// // 만약 전후 작업이 오래 걸린다고 생각하면?
// let user;
// beforeEach(async () => {
//   user = await asyncFn.connectUserDb();
// });
// afterEach(() => {
//   return asyncFn.disconnectDb();
// });

// // 이건 1초가 걸림, 전후가 0.5씩 소요되므로
// test('?', () => {
//   expect(user.name).toBe('James');
// })

// // 이건 1초가 걸림, 전후가 0.5씩 소요되므로
// test('?', () => {
//   expect(user.name).toBe('James');
// })
// // 이건 1초가 걸림, 전후가 0.5씩 소요되므로
// test('?', () => {
//   expect(user.name).toBe('James');
// })
// // 이건 1초가 걸림, 전후가 0.5씩 소요되므로
// test('?', () => {
//   expect(user.name).toBe('James');
// })
// // 여기까지는 총 4초가 걸림. 그럼 문제가 생기겠지? 각 테스트 전후가 아니라 최초, 최후에 처리
/**************************************************************************** */
// // 이때 사용하는 것이 beforeAll, afterAll이다.
// let user2;
// beforeAll(async () => {
//   user2 = await asyncFn.connectUserDb();
// });
// afterAll(() => {
//   return asyncFn.disconnectDb();
// });

// // 이건 1초가 걸림, 전후가 0.5씩 소요되므로
// test('?', () => {
//   expect(user2.name).toBe('James');
// })

// // 이건 1초가 걸림, 전후가 0.5씩 소요되므로
// test('?', () => {
//   expect(user2.name).toBe('James');
// })
// // 이건 1초가 걸림, 전후가 0.5씩 소요되므로
// test('?', () => {
//   expect(user2.name).toBe('James');
// })
// // 이건 1초가 걸림, 전후가 0.5씩 소요되므로
// test('?', () => {
//   expect(user2.name).toBe('James');
// })
/**************************************************************************** */
// // 만약 전후 작업을 처리할 대상이 많다면? describe로 분리하여 종속시킨다.
// describe('Store', () => {
//   let store;
//   beforeAll(async () => {
//     store = await asyncFn.connectStoreDb();
//   });
//   afterAll(() => {
//     return asyncFn.disconnectStoreDb();
//   });
//   test('?', () => {
//     expect(store.brand).toBe('GUCCI');
//   })
//   // 이건 1초가 걸림, 전후가 0.5씩 소요되므로
//   test('?', () => {
//     expect(store.name).toBe('mmmmm');
//   })
//   // 이건 1초가 걸림, 전후가 0.5씩 소요되므로
//   test('?', () => {
//     expect(store.color).toBe('BLACK');
//   })
// });
/**************************************************************************** */
// // 이 경우 어떻게 실행될까?
// beforeAll(() => console.log('외부 beforeAll'));   // 1
// beforeEach(() => console.log('외부 beforeEach')); // 2, 6
// afterEach(() => console.log('외부 afterEach'));   // 4, 10
// afterAll(() => console.log('외부 afterAll'));     // 마지막

// test('adds 1 + 2 to equal 3', () => { // 3
//   expect(sum(1, 2)).toBe(3);
// });

// describe('Store', () => {
//   beforeAll(() => console.log('내부 beforeAll'));   // 5
//   beforeEach(() => console.log('내부 beforeEach')); // 7
//   afterEach(() => console.log('내부 afterEach'));   // 9
//   afterAll(() => console.log('내부 afterAll'));     // 마지막 2

//   test('adds 1 + 2 to equal 3', () => { // 8
//     expect(sum(1, 2)).toBe(3);
//   });
// });
/**************************************************************************** */
// 마지막 테스트가 실패되었다면, 마지막만 한 번 더 실행하면 된다.
// let num = 0;
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(num, 2)).toBe(2);
// });
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(num, 2)).toBe(2);
// });
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(num, 2)).toBe(2);
// });
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(num, 2)).toBe(2);
// });
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(num, 2)).toBe(2);
//   num = 10;
// });
// // 이 코드는 실패, 이를 아래처럼 바꾼다.
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(num, 2)).toBe(2);
// });
// // 이렇게! 이것만 테스트하고 나머지를 통과시킨다.
// test.only('adds 1 + 2 to equal 3', () => {
//   expect(sum(num, 2)).toBe(2);
// });

// // 그런데 문제 있는 것은 이 코드다.
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(num, 2)).toBe(2);
//   num = 10;
// });
// // 이렇게! 이것만 통과하고 나머지를 테스트한다.
// test.skip('adds 1 + 2 to equal 3', () => {
//   expect(sum(num, 2)).toBe(2);
//   num = 10;
// });
/**************************************************************************** */
// // mock 함수: 테스트를 위해 흉내만 내는 함수(모형)
// // 만약 user DB에 접근해서 user list를 select 하는 작업이
// // 필요하다면 작성해야 될 코드가 매우 많아진다.
// // 테스트를 위한 코드보다 사전 작업 코드가 길어질 수 있다.
// // 외부 요인의 영향을 많이 받는다(네트워크 환경, DB 상태, OS 속도 등)
// // 테스트에서 같은 코드는 동일한 결과를 내야 한다.

// const mockFn = jest.fn();

// mockFn();
// mockFn(1);//mock이라는 프로퍼티가 있고, calls라는 배열이 있다.

// test('dd', () => {
//   console.log(mockFn.mock.calls);
//   expect('dd').toBe('dd');
// })

// // mock 함수의 강점은 mock 프로퍼티가 호출되었던 값들이 고스란히 저장됨에 있다.
// // 몇 번 호출되었는지, 어떤 인수가 전달되었는지 알 수 있어 효용성이 높다.

// test('함수는 2번 호출된다.', () => {
//   expect(mockFn.mock.calls.length).toBe(2);
// })
// test('2번째로 호출된 함수에 전달된 첫번째 인수는 1이다.', () => {
//   expect(mockFn.mock.calls[1][0]).toBe(1);
// })
/**************************************************************************** */
// // 이를 활용해보자.
// const mockFn2 = jest.fn();

// function forEachAdd1(arr) {
//   arr.forEach(num => {
//     // 이럴 때 시간을 들여서 함수 작성하지 말고 mock으로 쓰자.
//     // fn(num+1)
//     mockFn2(num + 1);
//   });
// }

// forEachAdd1([10, 20, 30]);

// test('함수는 3번 호출된다.', () => {
//   expect(mockFn2.mock.calls.length).toBe(3);
// })

// test('전달된 값은 11, 21, 31이다.', () => {
//   expect(mockFn2.mock.calls[0][0]).toBe(11);
//   expect(mockFn2.mock.calls[1][0]).toBe(21);
//   expect(mockFn2.mock.calls[2][0]).toBe(31);
// })
/**************************************************************************** */
// // 이를 활용해보자2. 특정 값을 반환하는 함수
// const mockFn3 = jest.fn(num => num + 1);

// mockFn3(10);
// mockFn3(20);
// mockFn3(30);

// // results에는 return된 값이 배열로 들어있다.
// test('함수는 3번 호출된다.', () => {
//   console.log(mockFn3.mock.results);
//   expect(mockFn3.mock.calls.length).toBe(3);
// })

// test('전달된 값은 11, 21, 31이다.', () => {
//   expect(mockFn3.mock.results[0].value).toBe(11);
//   expect(mockFn3.mock.results[1].value).toBe(21);
//   expect(mockFn3.mock.results[2].value).toBe(31);
// })
/**************************************************************************** */
// 실행할때마다 각각 다른 값을 return할 수 있다.
// 이 때는 mockReturnValue를 하며, 중간에 값을 바꿀 때는 mockReturnValueOnce를 사용한다.

// const mockFn4 = jest.fn();
// mockFn4
//   .mockReturnValueOnce(10)
//   .mockReturnValueOnce(20)
//   .mockReturnValueOnce(30)
//   .mockReturnValue(40);

// mockFn4();
// mockFn4();
// mockFn4();
// mockFn4();

// test('dd', () => {
//   console.log(mockFn4.mock.results);
//   expect(true).toBe(true);
// });
/**************************************************************************** */
// // 활용한다.
// mockFn4
//   .mockReturnValueOnce(true)
//   .mockReturnValueOnce(false)
//   .mockReturnValueOnce(true)
//   .mockReturnValue(false);

// const result = [1, 2, 3, 4, 5].filter(num => mockFn4(num));

// test('홀수는 1, 3, 5', () => {
//   expect(result).toStrictEqual([1, 3, 5]);
// });

// // mockResolvedValue 는 비동기를 흉내낸다.
// mockFn4
//   .mockResolvedValue({ name: 'james' });

// test('마피아는 James', () => {
//   mockFn4().then(resolve => {
//     expect(resolve.name).toBe('james');
//   })
// });
/**************************************************************************** */
// // 외부 코드가 필요하다면?
// test('유저를 생성한다.', () => {
//   // 진짜로 생겨버린다.
//   const user = asyncFn.createUser('james');
//   expect(user.name).toBe('james');
// });

// // 아래 함수로 해당 모듈을 모킹모듈로 만든다.
// jest.mock('../app.js');

// asyncFn.createUser.mockReturnValue({ name: 'james2' });
// test('유저를 생성한다2.', () => {
//   // 실제로 생기지 않는다.
//   const user = asyncFn.createUser('james2');
//   expect(user.name).toBe('james2');
// });
/**************************************************************************** */
// 유용한 메서드
const mockFn5 = jest.fn();

mockFn5(10, 20);
mockFn5();
mockFn5(30, 40);

test('한 번 이상 호출한다.', () => {
  expect(mockFn5).toBeCalled();
});
test('세 번 호출한다.', () => {
  expect(mockFn5).toBeCalledTimes(3);
});
test('10, 20을 전달 받은 함수를 찾는다.', () => {
  expect(mockFn5).toBeCalledWith(10, 20);
});
test('마지막 함수는 30, 40을 전달 받는다.', () => {
  expect(mockFn5).lastCalledWith(30, 40);
});
