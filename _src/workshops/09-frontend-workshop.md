---
title: Front End Web Development
slug: workshops/frontend-web-development
template: workshop
author: Eric Colon
---

Welcome to the Knight Hacks Front End Web Development workshop! This is part 1 in a series of workshops in which we will be creating a functional to-do list app.

Begin by cloning down this repo containing the necessary files for our app:
`git clone https://github.com/KnightHacks/web-dev-workshop.git`

Open `index.html` now. As you can see there's not much in it:

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

So, let's scaffold the HTML for our to-do list.


## Additional resources
[Mozilla Documentation on HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

[Mozilla Documentation on CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

[Mozilla Documentation on JavaScript](https://developer.mozilla.org/en-US/docs/Web/JS)

[Mozilla Web Developer Guide](https://developer.mozilla.org/en-US/docs/Web/Guide)

Never stop consulting the Mozilla docs.
