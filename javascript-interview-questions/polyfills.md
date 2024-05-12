# polyfills based Questions

Q1 - **Polyfill for call**

Read article [call, bind & apply polyfills](https://dev.to/kirteshbansal/call-apply-and-bind-javascript-methods-their-polyfills-k4e "call, bind & apply polyfills") for more details

    Function.prototype.mycall = function (obj, ...args) {
      let sym = Symbol();
      obj = Object(obj); // To handle null case
      obj[sym] = this;
      let res = obj[sym](...args);
      delete obj[sym];
      return res;
    };


Q2 - **Polyfill for apply**

Read article [call, bind & apply polyfills](https://dev.to/kirteshbansal/call-apply-and-bind-javascript-methods-their-polyfills-k4e "call, bind & apply polyfills") for more details

    Function.prototype.myapply = function (obj, args) {
      let sym = Symbol();
      obj = Object(obj);
      obj[sym] = this;
      let res = obj[sym](...args);
      delete obj[sym];
      return res;
    };


Q3 - **Polyfill for bind**

Read article [call, bind & apply polyfills](https://dev.to/kirteshbansal/call-apply-and-bind-javascript-methods-their-polyfills-k4e "call, bind & apply polyfills") for more details

    Function.prototype.mybind = function (obj, ...args) {
      let func = this;
      return function (...args1) {
        return func.apply(obj, [...args, ...args1]);
      };
    };