// const _ = require('lodash');

// const obj = {
//   a: 123,
//   b: '123',
//   c: [123, '123'],
//   d: { d1: 123, d2: '123' },
//   e: { e1: [123, '123'], e2: { e21: 123, e22: '123' } },
//   f: [123, '123', { f1: 123, f2: { f21: [123, '123'] }, f3: [{ f31: 123, f32: '123' }] }]
// };


// _.forIn(obj, (val, key) => {
//   console.log(key, val);
// });


// const a = 'a asdf ,, asdfasdf ,,, asdfas, asdf asdf, asd f,asdf,asdf ad a,,as fsd';
// const b = a.replace(/,,/, ',');
// console.log(b);


// const a = ['asdf', 'asdf', '234123'];
// console.log(a.join(','));


// const a = 123;
// const a = '123';
// const a = 'asd';
// const a = null;
// const a = undefined;

// const b = parseInt(a, 10);
// const b = parseInt(a, 10) || undefined;
// const b = parseInt(a, 10) || null;

// console.log(a);
// console.log('a:', typeof a);
// console.log(b);
// console.log('b:', typeof b);

// console.log('NaN:', typeof NaN);
// console.log('null:', typeof null);
// console.log('undefined:', typeof undefined);
// console.log(undefined == null);
// console.log(undefined === null);


class A {

  constructor({
    i1 = 0,
    i2 = 0,
    i3 = null,
    i4 = undefined,
    i5
  }) {
    console.log(i1);
    console.log(i2);
    console.log(i3);
    console.log(i4);
    console.log(i5);

    this.i1 = i1;
  }

}

const a = new A({
  i1: 3, i3: undefined, i4: null
});

console.log(a.i1);
