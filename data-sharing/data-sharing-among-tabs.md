# Browser events to share data between to Tabs


To share data between two browser tabs using events, you have several options depending on your requirements and the nature of the data you're working with. Here are the main methods:

### 1. Using `postMessage` and `message` Event Listener

This method involves sending messages between tabs using the `postMessage` API and listening for these messages in the target tab(s) using the `message` event listener. This approach is suitable for secure and controlled communication between tabs within the same domain.

```javascript
// Sending data from one tab
window.postMessage(JSON.stringify({chatmsg: someVarFromServer}), "*");

// Receiving data in another tab
window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    // Check the origin of the message to ensure security
    if (event.origin!== "http://www.yourdomain.com") return;
    var message = JSON.parse(event.data).chatmsg;
    // Process the received message
}
```

### 2. Using `localStorage` and `storage` Event

`localStorage` provides a way to store data on the client-side that can be accessed by any tab or window in the same domain. You can use the `storage` event to listen for changes made to `localStorage`.

```javascript
// Setting data in localStorage from one tab
localStorage.setItem("message", "Hello, world!");

// Listening for changes in another tab
window.addEventListener('storage', function(e) {
    if (e.key === 'message') {
        console.log('Received message:', e.newValue);
    }
});
```

### 3. Using the Broadcast Channel API

The Broadcast Channel API allows for simple communication between browsing contexts (tabs/windows) on the same origin. It's a straightforward way to send data without needing to serialize it into a string format.

```javascript
// Creating a new broadcast channel
const bc = new BroadcastChannel('my-channel');

// Sending data
bc.postMessage('Hello, world');

// Receiving data
bc.onmessage = function(event) {
    console.log('Received message:', event.data);
};
```

Each of these methods has its advantages and use cases:

* `postMessage` and `message` Event Listener: Best for secure, controlled communication between tabs. It requires explicit permission to send messages to other origins.
* `localStorage` and `storage` Event: Simple and effective for sharing small amounts of data. However, it may not be suitable for large datasets or frequent updates.
* Broadcast Channel API: Offers a simple and efficient way to communicate between tabs on the same origin without the overhead of serialization.

Choose the method that best fits your application's needs considering factors like security, performance, and the type of data being shared.

Citations:
\[1\] <https://stackoverflow.com/questions/10885751/how-to-share-data-between-browser-tabs>
\[2\] <https://navping.medium.com/realtime-communication-across-browser-tabs-16b721a93e2a>
\[3\] <https://blog.bitsrc.io/4-ways-to-communicate-across-browser-tabs-in-realtime-e4f5f6cbedca>
\[4\] <https://dev.to/dcodeyt/send-data-between-tabs-with-javascript-2oa>
\[5\] <https://intspirit.medium.com/comparison-of-data-transfer-methods-between-browser-tabs-in-spa-context-684c3d95c3a1>
\[6\] <https://learnersbucket.com/examples/interview/share-data-between-two-browser-window-with-javascript/>
\[7\] <https://derk-jan.com/articles/2020/05/cross-tab-events/>
\[8\] <https://dev.to/baedyl/share-data-between-browser-tabs-4hil>
\[9\] <https://www.youtube.com/watch?v=82EGTEqxiNA>