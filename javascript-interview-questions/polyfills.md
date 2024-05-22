# polyfills based Questions

Q1 - **Polyfill for call**

Read article [call, bind & apply polyfills](https://dev.to/kirteshbansal/call-apply-and-bind-javascript-methods-their-polyfills-k4e) for more details

```javascript
Function.prototype.mycall = function (obj, ...args) {
  let sym = Symbol();
  obj = Object(obj); // To handle null case
  obj[sym] = this; // referring to the function on the left of the "."
  let res = obj[sym](...args);
  delete obj[sym];
  return res;
};
```


Q2 - **Polyfill for apply**

Read article [call, bind & apply polyfills](https://dev.to/kirteshbansal/call-apply-and-bind-javascript-methods-their-polyfills-k4e) for more details

```javascript
Function.prototype.myapply = function (obj, args) {
  let sym = Symbol();
  obj = Object(obj);
  obj[sym] = this;
  let res = obj[sym](...args);
  delete obj[sym];
  return res;
};
```


Q3 - **Polyfill for bind**

Read article [call, bind & apply polyfills](https://dev.to/kirteshbansal/call-apply-and-bind-javascript-methods-their-polyfills-k4e) for more details

```javascript
Function.prototype.mybind = function (obj, ...args) {
  let func = this;
  return function (...args1) {
    return func.apply(obj, [...args, ...args1]);
  };
};
```



Q4 - **Polyfill for Promise**


```javascript
function PromisePolyFill(executor){

  let onResolved, onRejected;
  let isFullfilled = false, isRejected = false, isCalled = false, value;
 
  this.then = function(cb){
    onResolved = cb;

    if(isFullfilled && !called){
      onResolved(value);
      isCalled = true;
    }

    return this;
  }

  this.catch = function(cb){
      onRejected = cb;

    if(isRejected && !called){
      onRejected(value);
      isCalled = true;
    }
    return this;
  }

  function resolve(value){
    value = value;
    isFullfilled = true;

    if(typeof onResolved === 'function'){
      onResolved(value);
      isCalled = true;
    }
  }
  
  function reject(reason){
    value = reason;
    isRejected = true;
    if(typeof onRejected === 'function'){
      onRejected(value);
      isCalled = true;
    }
  }

  try{
    executor(resolve, reject)
  } catch(err){
      reject(err);
  }
}


const promise1 = new PromisePolyFill((resolve, reject) => {
  console.log(1)
  setTimeout(() => {
      resolve(2)
    }, 1000);
  console.log(3)
})

promise1.then(res => {
  console.log(res)
});
console.log(4)   // output - 1 3 4 2
```



Q5 - **Polyfill for Promise.resolve**


```javascript
PromisePolyFill.resolve = (val) =>
  new PromisePolyFill(function executor(resolve, reject) {
    resolve(val);
});
```


Q6 - **Polyfill for Promise.reject**


```javascript
PromisePolyFill.reject = (reason) =>
  new PromisePolyFill(function executor(resolve, reject) {
    reject(reason);
});
```


Q7 - **Polyfill for Promise.race**


```javascript
export function promiseRacePolyfill(promisesArr) {
  return new Promise((resolve, reject) => {
    promisesArr.forEach((promise) => {
      promise
        .then(resolve) // resolve outer promise, as and when any of the input promise resolves
        .catch(reject); // reject outer promise, as and when any of the input promise rejects
    });
  });
}
```


Q8 - **Polyfill for Promise.all**


```javascript
function myAll (promises){
const result = [];
 return new Promise((resolve,reject) => {
    promises.forEach((p,i) => {
      p.then(val => 
        result[i] = val;
         if(promises.length === result.length){
          resolve(result);
         }
      ).catch(err => reject(err))
    })
  }) 
}
```


Q9 - **Polyfill for Promise.allSettled**


```javascript
function myAllSettled(promises){
const mappedPromises = promises.map(p => {
  return p.then(value => ({value, status: 'fullfilled'})).catch(reason => ({reason, status: 'rejected'}))
})
  return Promise.all(mappedPromises)
}
```


Q9 - **Polyfill for Promise.any**


```javascript
function myAny(promises){
  let errors = [];
  return new Promise((resolve,reject) => {
    promises.forEach((p,i) => {
      p.then(val => resolve(val)).catch(reason => {
        errors[i] = new Error(reason);
        if(errors.length === promises.length){
          reject(new AggregateError(errors, 'All promises failed'))
        }
      })
    })
  })
}
```


