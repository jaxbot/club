---
title: JavaScript, its quirks, and ES6
slug: workshops/javascript
template: workshop
author: Jonathan Warner
---

# Prelude

JavaScript is becoming increasingly important each year, with JS being available for server applications with Node.js, to IoT devices like Tessel running it, to the fact it's really the only (native) language available for the consumer facing side of web applications.

Despite this, JavaScript has quite a number of quirks, especially considering the original spec was created in all of 10 days! It also, confusingly, has nothing to do with Java.

# Getting started with this workshop

Since JavaScript can be run in the browser, there are two main ways of following along in this workshop.

The first way, the way I'll be doing it, is using the built-in Chrome console. It's worth getting familiar with this as it's ~useful for deleting annoying modals~ a very helpful debug tool. To access it, right click anywhere on the page and press Inspect Element. This will also work in Firefox and Edge.

The second way is to make an HTML file like so, and then open said file in your web browser:

```html
<html>
<head></head>
<body>
<script>
// put your JS code here
</script>
</body>
</html>
```

# JavaScript Basics

Let's define some variables and print stuff out:

```js
var foo = "Hi, I'm a string";
foo = 5; // Jk, it's a number now
foo = foo + 10;

console.log(foo);
foo = "I'm a string again!";
console.log(foo);
```

Here's an interesting point: JavaScript is *weakly* typed, meaning the types are all implicit and the language will allow you to arbitrarily switch the type of variable. This can be useful, but it can also cause problems when you expect a number in a function and get passed a string. Regardless, everything is declared with `var`; there is no concept of `int`, `string`, etc, during declaration.

## Arrays

Arrays can be dynamically declared, manipulated, resized, etc., in JavaScript, similar to an ArrayList in Java:

```js
var pets = ["Cat", "Dog", "Fish", "Apple Juice"];

console.log("There are " + pets.length + " pets");
console.log(pets[1]); // Dog

// Add a pet
pets.push("Fennec Fox");
console.log(pets[pets.length - 1]);

// Remove Fish
pets.splice(pets.indexOf("Fish"), 1);

console.log(pets);
```

## Functions

Functions can be declared at any time and can return whatever they want, including different types. There are a few different ways to declare functions; we'll cover two of them.

```js
function buyFish(fishNumber) {
      console.log("You bought the fish #" + fishNumber);
      return true;
}
// to call it:
buyFish(7);

// or

var buyFish = function(fishNumber) {
      console.log("You bought the fish #" + fishNumber);
      return true;
}
// to call it:
buyFish(7);
```

These are (mostly) equivalent and will define a function that returns true and logs out the parameter. JavaScript also has anonymous functions that behave a bit like lambdas. We've actually more or less covered this in the second example, as we've created an anonymous function and assigned it to a variable. But it's also legal to do this:

```js
(function(fishNumber) {
      console.log("You bought the fish #" + fishNumber);
      return true;
})();
```

which will declare the function and call it at the same time. You can treat functions like an object that you can pass around, rename, shove in objects, etc., as you will see in a moment.

## Objects

When writing JavaScript, objects (dictionaries, more or less) are a very useful construct. They can hold anything, even recursively, and can be redefined or restructured at any point in time.

```js
var basicObject = {
      someAttribute: "Hello!",
      another: 5,
}

// Two ways to access members of the object: dot notation and bracket notation
console.log(basicObject.someAttribute);
console.log(basicObject['another']);

// Bracket notation is useful when you have something dynamic:
console.log(basicObject['an' + 'other']);
```

As I said before, objects can contain anything, including arrays, other objects, and functions:

```js
var restaurant = {
      title: "Tijuana Flats",
      rating: 9 / 10,
      comments: [
	    {
		  from: "Jonathan",
		  body: "T-flats is delicious!",
	    },
	    {
		  from: "Ivey",
		  body: "The ice has a really interesting texture"
	    },
      ],
      navigateTo: function() { location.href = "http://www.tijuanaflats.com/" }
};

for (var i = 0; i < restaurant.comments.length; i++) {
      console.log(restaurant.comments[i].from + ": " + restaurant.comments[i].body);
}
```

That's pretty much the basics of the JavaScript language; everything is an object and can be glued together however you wish.

# Callbacks

Callbacks refers to a common practice with JavaScript where a function will be called with reference to a function that handles the results of it. Before we dive into why you would ever want to do that, let's look back at Tyler's Node.js Twittebot code. If you haven't already done that workshop, it's worth checking out after this one. Here's a bit of code that was used:

```js
Twitter.post('statuses/update', {status: 'I Love Tech Knights!'},  function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
```

**Don't try to run this code**, because it won't work in the HTML page environment since the Twitter package doesn't exist there. But pay attention to the third parameter to the call to Twitter.post: it's an anonymous function with some parameters, followed by code that prints out those parameters.

That function is the *callback* for the Twitter.post call, and will be called by the Twitter.post function once the results are done and pass it the results.

**But why wouldn't you just return the parameters?**

This goes into a very important point about how JavaScript is implemented. Web browsers and Node.js execute JavaScript code as single-threaded. If you're not sure what that means, just note that if the JavaScript engine were to ever pause to wait for an action to complete, the entire application would freeze until that action completed. In an age where web applications are constantly polling for new changes and updating the page content live or showing new notifications, it would be extremely annoying to the end user if the application lagged whenever a network request was loading. For this reason, among others, many tasks in JavaScript are **asynchronous**.

When things are **asynchronous**, an action will be queued up and will occur at some other point in time. In the case of the Twitter example, the API request to Twitter to post a status update gets sent, and we'll get the results when we get a reply back from Twitter's server. Since we don't want to halt our application until then, we register a callback function that will be executed once the results are complete.

We cannot simply **return** the results because they will not be ready at the time the function completes. In asynchronous code, the call to `Twitter.post` will finish and return before the callback function ever will.

This is a lot of words, so it's easier to explain in an example:

```js
function sendFakeRequest(request, callback) {
  setTimeout(callback, 100);
};

console.log("1");
sendFakeRequest("follow @TechKnightsUCF", function(results) {
  console.log("2");
});
console.log("3");
```

When executed, the output will be in the order 1, 3, and 2, because the code *after* the first function call will execute before the callback will. Of course, there are some exceptions to this, but in general any API call, AJAX call, deferring, timeout, etc., will fire the callback after the execution of all the code around it.

This becomes very important when dealing with **multiple** asynchronous requests. This time we'll actually make an AJAX request using some boilerplate code.

```js
function ajaxGet(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function() {
    callback(xhr.responseText);
  };
  xhr.send();
}

ajaxGet("http://techknights.org/cors/test.txt", function(results) {
  console.log(results);
});
ajaxGet("http://techknights.org/cors/abc.txt", function(results) {
  console.log(results);
});
```

When this is run, sometimes I get these results:

```
abcdefghixyzabcdefghixyzabcdefghixyz
Hello! This is a test file.
```

and sometimes I get them in the other order,

```
Hello! This is a test file.
abcdefghixyzabcdefghixyzabcdefghixyz
```

Because we've simply set up two sepearate network requests at the same time, we have no idea or guarentee what order they will return in. Depending on random network factors, payload size, and server load, we can get the results in either order. This could be really bad if we needed two requests to happen in a specific order, say making an API call to delete a user and then making an API call to create a user under the same name. If the sequence of events is important, we must include the next level of code inside the callback:

```js
ajaxGet("http://techknights.org/cors/test.txt", function(results) {
  console.log(results);
  ajaxGet("http://techknights.org/cors/abc.txt", function(results) {
    console.log(results);
  });
});
```

This new code will always print lines in the same order, because we don't start the second network request until the first has finished. A good candidate for this pattern would be if data returned from the first request was actually required to make the second request.

That's as much as we'll go into asyncronous programming for today, but do keep these patterns in mind as they show up very, very frequently, especially in Node.js.

# Fun quirks

I'm going to preface this section with an excerpt from [Gary Bernhardt's wat talk](https://youtu.be/20BySC_6HyY?t=1m19s). The gist of it is that JavaScript is loosely typed and any loosely typed language is going to have some interesting behavior when different types are automatically cast into others.

## Variable Hoisting

JavaScript has a concept called variable hositing. While you would always declare variables at the top of a function or file, variables can technically be declared anywhere in their scope.

```js
for (i = 0; i < 100; i++) {
  // doSomething
}

var i;
console.log(i);
```

This code runs and prints out 100. The `var i` will be implictly understood the same way as if the `var i` were at the top of that section. This is fine. But this can become a little weird:

What do you expect the output of this code to be?

```js
var i = 5;
function foo() {
  var i = 2;
  bar();
  console.log(i);
}

function bar() {
  console.log(i);
}

foo();
```

The answer is 5, 2. A little strange, since we declared `i` in the outer scope, redeclared it in the inner scope of a function, then went to another context where the outer scope version was used, then back to one where our new scope was used.

But that output isn't nearly as strange as this:

```js
var j = 20;
function boo() {
  console.log("j is " + j);
  return;
  var j = 5;
}
boo();
```

Even though we never actually execute `var j = 5;`, we still have a variable declaration in this function, so j is initially undefined in this scope as we wait for it to be initialized. It will never be initialized, though, since we return before that ever happens.

And if that wasn't fun enough, 

```js
var j = 12;
function paz() {
  var j = 10;
  if (false) {
    var j = 1;
  } else {
    var j = 15;
    j--;
  }
  console.log("j is " + j);
}
paz();
console.log("Out here, j is " + j);
```

In this case, note that a function counts as a new scope, but an if block does not.

tl;dr, declare variables at the top of functions always, don't declare halfway through or in an if statement.

## Non-sensical, and usually non-issue, but humorous

Many of these via [Brian Leroux](http://brian.io/slides/dotjs-2012/):

A great deal of odd issues can occur when JavaScript automatically type casts, or coerces numbers and strings, into another type. There are some cases where this can be useful, like:

```js
var visitorNumber = 10;
console.log("Hello, you are the " + visitorNumber + "th visitor.");
```

This is nice because we do not have to convert it to a string to use it with one.

This is less nice when you think about cases where you actually wanted two numbers.

```js
var yourConstant = 10;
var userInput = "5";

console.log(yourConstant + userInput);
console.log((yourConstant + userInput) / 10);
```

It also makes no sense when you do stuff like this:

```js
var a = 10;
var b = "1";

console.log(a - b);
console.log(a + b);
```

Lastly, does this look like valid syntax?

```js
1..toFixed(10);
```

To prevent oddities, make sure that you guarentee your input is what you want it to be, i.e. convert things to strings and integers depending on what you want.

# ES6

ECMAScript6 (and, at some point, 7 and beyond) provide new language-level features to JavaScript that help fix previous shortcomings of the language.

The bad news is that the spec still isn't fully supported in the latest versions of every web browser, and since it has new syntax-level features, the code will not execute correctly in IE11 and below. The good news is that projects like [Babel](https://babeljs.io/) can convert your fancy new ES6 and beyond JavaScript into code that older browsers can understand.

There's a ton of new features, but let's walk through a few of my favorites.

**Note**: Unless you are on Chrome 50 or Firefox 44, it's likely these examples will not work in your browser, at least for now.

## Object destructuring

It's possible to deconstruct an object at the declaration stage now:

```js
var fruits = {
  apple: { color: "red" },
  orange: { color: "orange" },
  banana: { color: "yellow" },
};
var {apple} = fruits;
console.log(apple); // { color: "red" }
```

A nice use case is importing Node modules, i.e.

```js
// Old way
var spawn = require("child_process").spawn;

// Newer way
var {spawn} = require("child_process");
```

You can also do the same with arrays:

```js
var [first, second] = [1, 2, 3, 4];
console.log(first); // 1
console.log(second); // 2

var [first, , third] = [1, 2, 3];
console.log(first); // 1
console.log(third); // 3
```

## Spread

You can use the spread operation in a few ways:

```js
var [first, second, ...otherstuff] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(otherstuff); // [3, 4, 5]
```

You can also use it in construction:

```js
var happyWords = ["Excited", "Tesla", "Node.js"];
var sadWords = ["Tutition", "Parking", "Loathe"];
var allWords = [...happyWords, ...sadWords];
console.log(allWords); // [ "Excited", "Tesla", "Node.js", "Tutition", "Parking", "Loathe" ]

var sadAndMad = ["Angry", "Ticked", ...sadWords];
console.log(sadAndMad); // [ "Angry", "Ticked", "Tutition", "Parking", "Loathe" ]
```

## Arrow functions

JavaScript is getting arrow functions, which provide a shorter syntax for anonymous functions and help preserve scope when dealing with the `this` pointer:

```js
// Old way

function Cat() {
  var self = this;
  self.meows = 0;
  self.meow = function() {
    self.meows++;
  };
}

// New way
function Cat() {
  this.meows = 0;
  this.meow = () => { this.meows++; };
}

var korra = new Cat();
korra.meow();
console.log(korra.meows);
```

## Classes

This is crazy huge: JavaScript is finally getting classes of some sort!

```js
class Animal {
  constructor(name, owner) {
    this.name = name;
    this.owner = owner;
  }

  getOwner() {
    return this.owner;
  }
}

class Cat extends Animal {
  constructor(name, owner) {
    super(name, owner);
    this.meows = 0;
  }
  meow() {
    this.meows++;
  }
}

var korra = new Cat("Korra", "Ivey");
console.log(korra.getOwner());
korra.meow();
console.log(korra.meows);
```

# Challenge and Moving forward

If you're comfortable with JavaScript and want to learn more about the future of it, check out [Babel's ES6 Guide](https://babeljs.io/docs/learn-es2015/)

If you want to get more practice with JavaScript, [step through Tyler's Twitterbot workshop](http://techknights.org/workshops/nodejs-twitterbot/) and try to complete the challenge at the end.

If you want a fun challenge involving asynchronous programming, consider this problem:

You have three API calls to make. They can be made in any order, but you cannot render the page until all three of them complete. A naive solution is as follows:

```js
ajaxGet("/user", function(results) {
  ajaxGet("/posts", function(results) {
    ajaxGet("/notes", function(results) {
      renderPage();
    });
  });
});
```

This works, but it's suboptimal because the requests do not rely on each other, but we're still doing them one at a time and have to wait for one to finish before starting another. How can this be done in parallel while still ensuring all requests finish?
