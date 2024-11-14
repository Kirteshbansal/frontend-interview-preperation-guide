# Js memory leak

> Tip: Discover JavaScript memory leaks in real-time with the Chrome DevTools Performance Monitor. Three dot menu > More tools > Performance monitor.


Some resources on memory I'm happy to recommend:

 \n 

Fixing memory leaks in web applications by Nolan Lawson: <https://nolanlawson.com/2020/02/19/fixing-memory-leaks-in-web-applications/> \~ a great guide to common causes of JavaScript memory leaks, how to identify and fix them using DevTools > Memory > Heap Snapshots.

 \n 

Find and fix tricky memory leaks caused by detached windows by Jason Miller and Bartek Nowierski: <https://web.dev/articles/detached-window-memory-leaks>- a great primer filled with practical code examples and solutions related to leaks from popups (and more).

 \n 

If you're looking for a demo with JavaScript memory leaks to try out with the Performance Monitor, here's a good one: <https://gist.github.com/nolanlawson/ba957ca84a7a4da4020c0401540162ca> and this one's good for Heap Snapshots: <https://detached-windows-test.glitch.me/>

 \n 

If you're into a quick video tutorial, egghead.io have a good quick video on how to detect memory leaks using the DevTools -> Memory -> Allocation Instrumentation tools: <https://egghead.io/lessons/javascript-easily-detect-memory-leak-source-using-chrome-dev-tools-allocation-instrumentation>

 \n 

Debugging JavaScript memory leaks by DebugBear is also good and includes practical examples: <https://www.debugbear.com/blog/debugging-javascript-memory-leaks>

 \n 

JavaScript Memory Management Masterclass by me: <https://speakerdeck.com/addyosmani/javascript-memory-management-masterclass> - this is on the dated side (\~2014) but gives you a deep dive into how to think about memory management with coverage of the sawtooth pattern and GMail's "three snapshot" technique.

 \n 

In terms of state-of-the-art tooling, Glenn Conner at Meta just released MemLab https://lnkd.in/gSrRbr2H - a testing framework for automatically finding memory leaks.