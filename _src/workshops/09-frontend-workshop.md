---
title: Front End Web Development
slug: workshops/frontend-web-development
template: workshop
author: Eric Colon
---

Welcome to the Knight Hacks Front End Web Development workshop! This is part 1 in a series of workshops in which we will be creating a functional to-do list app.

Begin by cloning down this repo containing the necessary files for our app:
`git clone https://github.com/KnightHacks/web-dev-workshop.git`

Navigate to the directory you cloned the repo down to and Open `index.html`. As you can see there's not much in it:

```
<!doctype html>
<html>
	<head>
		<title>Todo List</title>

		<link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,700|Roboto+Condensed:400,700" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="css/todolist.css">
	</head>

	<body>

		<script src="js/todolist.js"></script>
	</body>
</html>
```

This this is just some basic scaffolding that links to an external Google Fonts stylesheet, and the `.css` and `.js` files we will be working on later.

Let's begin scaffolding the actual to-do list. Add this block of HTML after the opening `<body>` tag:

```
<main class="TodoListContainer">
  <div class="TodoList">
    <h1>To-do</h1>

    <div id="itemsList" class="itemsList">
    </div>

    <div class="buttonContainer">
      <button class="addButton" id="addButton">+</button>
    </div>
  </div>

  <div class="inputBoxContainer">
    <div class="inputBox addItem">
      <input type="text" id="newTodoLabel" placeholder="To-do item...">
    </div>
  </div>
</main>
```

We've added quite a few elements, so let's break this down a bit.

`<main class="TodoListContainer">` is acting as a container for the entire to-do list, including the input box for us to add new items. It has a `class` attribute set to `ToDoListContainer`.

`<div class="TodoList">` is the actual to-do list card. It contains an `<h1>`, a `<div id="itemsList" class="itemsList">`, and a `<div class="buttonContainer">` with a `<button class="addButton" id="addButton">` as its child. That element is the button that will reveal an input box for us to add new items with.

`<div class="inputBoxContainer">` is a container for our input box and `<input type="text" id="newTodoLabel" placeholder="To-do item...">` is clearly the input box. Notice it has a `placeholder` attribute set to `To-do item...`, this string acts as placeholder text for the input box until we begin writing content in it.

Now, add this remaining bit of HTML after the previous block we've added.

```
<div id="itemTemplate" class="template item">
	<div class="checkBox">
		<input type="checkbox" id="item_id">
	</div>

	<div class="itemTitle">item_title</div>
</div>
```

This bit of HTML is serves as a template for new items in our to-do list. It will be hidden by default using CSS, then, when a new item is added to the list, it will be copied and added as a child into the `<div id="itemsList" class="itemsList">`.

Your file should now look like so:

```
<!doctype html>
<html>
	<head>
		<title>Todo List</title>

		<link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,700|Roboto+Condensed:400,700" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="css/todolist.css">
	</head>

	<body>
		<div class="TodoListContainer">
			<div class="TodoList">
				<div class="title">To-do</div>

				<div id="itemsList" class="itemsList">
				</div>

				<div class="magic">
					<div class="addButton" id="addButton">+</div>
				</div>
			</div>

			<div class="inputBoxContainer">
				<div class="inputBox addItem">
					<input type="text" id="newTodoLabel" placeholder="To-do item...">
				</div>
			</div>
		</div>

		<div id="itemTemplate" class="template item">
			<div class="checkBox">
				<input type="checkbox" id="item_id">
			</div>

			<div class="itemTitle">item_title</div>
		</div>

		<script src="js/todolist.js"></script>
	</body>
</html>
```

That's it as far as the HTML is concerned; let's style everything now. Open the `todolist.css` file.

```
* {
	box-sizing: border-box;
}

body {
	padding-top: 20px;

	font-family: Roboto, sans-serif;

	background: #efefef;
}

.template {
	display: none;
}
```

Some base styling has been included. We're using the `*` selector to target all elements and assign them a `box-sizing` property set to `border-box`. The `border-box` value makes the `padding` and `border` of an element fill the inside of the element, instead of outside by default. It's a useful trick that helps with managing layouts.

Add this CSS before `.template`:

```
.TodoListContainer {
	position: relative;

	margin: auto;
	width: 350px;
}

.TodoList {
	position: relative;

	padding-bottom: 40px;

	background: #fafafa;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),
							0 3px 1px -2px rgba(0,0,0,.2),
							0 1px 5px 0 rgba(0,0,0,.12);
}

.TodoList .title {
	padding: 20px;

	font-family: 'Roboto Condensed', sans-serif;
	font-size: 20px;
	font-weight: 700;

	border-bottom: 1px solid rgba(0,0,0,0.1);
}

.itemsList {
	position: relative;
	display: block;
}

.addButton {
	display: block;
	height: 56px;
	margin: auto;
	padding: 12px 0;
	overflow: hidden;
	width: 56px;

	font-size: 24px;
	line-height: normal;
	text-align: center;

	background: #f44336;
	border: 0;
	border-radius: 50%;
	box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),
							0 3px 1px -2px rgba(0,0,0,.2),
							0 1px 5px 0 rgba(0,0,0,.12);
	color: #fafafa;

	transition: background 0.25s ease;
}

.addButton:hover {
	background: #ff5e52;
}

.addButton:active {
	background: #c12b20;
}

.magic {
	position: absolute;
	right: 0;
	bottom: -28px;
	left: 0;

	width: 100%;
}
```

As you can see, that's a lot of CSS, so it won't be very time efficient to do anything other than a high-level explaination of all this.

`.TodoListContainer` has been assigned a `position`, `margin`, and `width` property. This has given us a centered container for our list.

`.TodoList` has been assigned a `position`, `padding-bottom`, `background`, and `box-shadow` property. The result is an off-white card with a subtle shadow that bottom padding for the "add" button.

`.TodoList .title` has been styled to have padding around it, its typeface set to a bolded form of "Robot Condensed", and a faint bottom border.

`.addButton` has a lot of styling applied to it that's necessary to give it a nice "Material Design" look and feel.

`.addButton:hover` changes the background of the button to a lighter shade of red when hovered over.

`.addButton:active` changes the background of the button to a darker shade of red when hovered over.

`.magic` is a special container for the button. It's the full width of the to-do list card and assists with centering the button and moving it halfway off the edge of the to-do list card.

We're almost there! Add this remaining CSS after `.magic`:

```
.item {
	padding: 10px 20px;

	font-family: 'Roboto Slab','Times New Roman',serif;
	font-size: 14px;
	line-height: 19px;
	word-wrap: break-word;

	border-bottom: 1px solid rgba(0,0,0,0.1);
	color: rgba(0,0,0,0.8);
	outline: none;
}

.item .itemTitle {
	display: inline-block;

	font-weight: 600;
}

.item .checkBox {
	display: inline-block;
}

.item.checked .itemTitle {
	text-decoration: line-through;

	color: rgba(0,0,0,0.4);
}

.inputBox {
	padding: 20px;
	width: 100%;

	background: #fafafa;
}

.inputBoxContainer {
	height: 0;
	margin-top: 38px;
	overflow: hidden;

	box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),
							0 3px 1px -2px rgba(0,0,0,.2),
							0 1px 5px 0 rgba(0,0,0,.12);

	transition: height 0.25s ease;
}

.inputBoxContainer.visible {
	height: 80px;
}

.inputBox input {
	background: rgba(0,0,0,0.1);
	border: none;
	border-bottom: 1px solid rgba(0,0,0,.12);
	display: block;
	font-size: 16px;
	margin: 0;
	padding: 10px;
	width: 100%;
	text-align: left;
	color: inherit;
}

.template {
	display: none;
}
```

Once again, a high-level explanation will be necessary for all of this.

`.item` has been assigned a `position`, `margin`, and `width` property. This has given us a centered container for our list.

`.item .itemTitle` has been assigned a `position`, `padding-bottom`, `background`, and `box-shadow` property. The result is an off-white card with a subtle shadow that bottom padding for the "add" button.

`.item .checkBox` has been styled to have padding around it, its typeface set to a bolded form of "Robot Condensed", and a faint bottom border.

`.item.checked .itemTitle` has a lot of styling applied to it that's necessary to give it a nice "Material Design" look and feel.

`.inputBox` changes the background of the button to a lighter shade of red when hovered over.

`.inputBoxContainer` changes the background of the button to a darker shade of red when hovered over. TALK ABOUT THE TRANSITION

`.inputBoxContainer.visible ` is a special container for the button. It's the full width of the to-do list card and assists with centering the button and moving it halfway off the edge of the to-do list card.

`.inputBox input` is a special container for the button. It's the full width of the to-do list card and assists with centering the button and moving it halfway off the edge of the to-do list card.

Phew, we're done with the CSS for this thing! If you open `index.html` in your browser, you should have a gorgeous Material Design inspired to-do list:

<SCREENSHOT>

Let's make this work now. Open `todolist.js`:

```
document.addEventListener('DOMContentLoaded', function() {
	var items    = [];
	var inputBox = document.querySelector(".inputBoxContainer");

  // the magic happens here
});
```

Some groundwork has been laid out for us already. As explained in the [intro workshop](/workshops/intro-web-development), we're placing all of our code within an anonymous function that will be called when the DOM finishes loading. This is to prevent the infamous FOUC (flash of unstyled content). We're also initialized two variables, `items` and `inputBox`. The `items` variable has been assigned as an empty array for now, while `inputBox` has been assigned the `<div>` with its class set to `.inputBoxContainer`.

Let's get the button working now. Replace `// the magic happens here` with this code:

```
document.querySelector("#addButton").addEventListener("click", function() {
  inputBox.classList.toggle("visible");
  document.querySelector("#newTodoLabel").focus();
}, false);
```

This code is listening for when we click the add button. When that happens our `inputBox` variable will have the `.visible` class toggled on; this will reveal the input box (and render a nice transition as well). Afterwards, we select the input box and apply the `.focus()` method... Which focuses it.

Now we need to handle inputting data into the input field. Add this code after the previous block:

```
document.querySelector("#newTodoLabel").addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    items.push({ title: e.target.value });
    updateList();
    inputBox.classList.toggle("visible");

    e.target.value = "";
  }
}, false);
```

What's happening here is we're checking if the key code of whatever button we're entered while using the form is `13` (which is for `enter`), and if so, we push an object onto the `items` array. This object has a `title` property that contains the value (`e.target.value`) of what was typed into the input field.

After that, an `updateList();` function is called (we'll define that later) and the `inputBox` has the `.visible` class toggled once again to hide it.

We then reset the value of `e.target.value` to an empty string.

Last but not least, let's define the `updateList()` function. Add this code after the previous block we've written:

```
function updateList() {
  var html     = "";
  var template = document.querySelector("#itemTemplate").innerHTML;

  for (var i = 0; i < items.length; i++) {
    var contents = template.replace("item_id", "item_" + i).replace("item_title", items[i].title);
    html += "<div class='item'>" + contents + "</div>";
  }

  document.querySelector("#itemsList").innerHTML = html;

  [].forEach.call(document.querySelectorAll("input[type=checkbox]"), function (el) {
    el.addEventListener("click", function() {
      el.parentNode.parentNode.classList.toggle("checked");
    }, false);
  });
}
```

We've defined two variables within the scope of this function: `html` and `template`. `html` is merely an empty string for now, and `template` has been assigned the child nodes of `<div id="itemTemplate" class="template item">`.

Next, we loop through each item in the `items` array and assign a new `contents` variable the HTML that's within the `template` variable. However, it has been modified in that `{{item_id}}` has been replaced with `"item_" + i` (which will be "item_1 ... n") and `{{item_title}}` has been replaced with the value of `title` at whichever iteration we are at in the loop.

Then we select `<div id="itemsList" class="itemsList">` and update its inner HTML to our newly generated list!

Finally, we add a selector to all checkboxes within that list so that whenever they're clicked, a `.checked` class will be toggled on that list item which will add or remove a line through the text.

And with that, we are done!

## Additional resources
[Mozilla Documentation on HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

[Mozilla Documentation on CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

[Mozilla Documentation on JavaScript](https://developer.mozilla.org/en-US/docs/Web/JS)

[Mozilla Web Developer Guide](https://developer.mozilla.org/en-US/docs/Web/Guide)

Never stop consulting the Mozilla docs.
