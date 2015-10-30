---
title: Intro to Web Development
slug: workshops/intro-web-development
date: 10/30/2015
template: workshop
---

Welcome to the Knight Hacks Intro to Web Development workshop! We're going to cover the basics of HTML, CSS, and Javascript while building a simple Knight Hacks styled landing page.

First, you'll need to clone down this repo: `git clone https://github.com/KnightHacks/web-dev-workshop.git`

These are the files you will be using to build the landing page. Let's begin!

# HTML <small>(HyperText Markup Language)</small>
HTML is the standardized markup language used in the creation of web pages; the most basic building block. Web browsers read HTML code and render it into web pages. However, it only describes the structure and the semantic content of a web page.

Open the `index.html` file within the directory you cloned down in your text-editor/IDE. You'll notice there is some HTML within the file already:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">

  </head>

  <body>

  </body>
</html>
```
Here's a quick breakdown of what the tags already in this file mean:

`<!DOCTYPE html>` - Okay, this isn't actually a tag. It's the doctype declaration for the file.

`<html></html>` - The root element of a web page.

`<head></head>` - Contains general information about a web page and links to external scripts/stylesheets.

`<meta>` - Represents a specific piece of metadata about the web page.

`<body></body>` - Defines the body of the web page's content.

`<main></main>` - Represents the main content within the body.

Off the bat there are quite a few things missing here, so let's add them in!

First of all, we need a title for this web page. Easy enough! Simply add in a `<title>` tag between the two `<head>` tags and after the `<meta>` tag, like so:

```
<head>
  <meta charset="UTF-8">

  <title>Web Development Workshop!</title>
</head>
```

Refresh your browser tab. The web browser will now read the string between the opening `<title>` tag and the closing `</title>` tag and assign that string as the title of the web page. Almost all HTML tags have matching closing tags ([with some exceptions](http://webdesign.about.com/od/htmltags/qt/html-void-elements.htm), like the `<meta>` tag explained above), so don't forget to include them when writing your markup!

Now we'll need a header, some content, and a footer. Let's start with the header first.

Add this HTML between the opening and closing `<body>` tags:

```
<header>
  <img class="logo" src="logo.png" alt="Knight Hacks logo">
</header>
```

The `<header>` tag is defining the header for our web page, and the `<img>` represents an image in our web page. As you can see, this `<img>` element is using three attributes: `class`, `src`, and `alt`. The `class` attribute contains a list of CSS classes that apply styling to the image, the `src` attribute defines the image URL, and the `alt` attribute defines alternative text to be fed to screen readers or displayed in the event the image fails to load.

Next, let's add the main content to our page. Add this HTML after the closing `<header>` tag:

```
<main>
  <h1>Knight Hacks Workshop!</h1>

  <p><button id="kh-button">Click me!</button></p>

  <p id="hidden-message" class="hidden">Happy Halloween!</p>
</main>
```

The `<main>` tag is representing the main content of the page within the body, the `<h1>` is a top-level heading for this section of the document, `<p>` is for paragraphs of text and the `<button>` is... A button &mdash; who would have thought? Notice that the button does nothing when clicked and has its `id` attribute set to `kh-button`. Also notice that the last `<p>` tag has its `id` attribute set to `hidden-message` and its `class` attribute set to `hidden`. We'll address this all later.

Finally, let's add a footer to this page. Add the following HTML after the closing `<main>` tag:

```
<footer>
  <p>Made with love by the Knight Hacks club!</p>
</footer>
```
As you can probably guess by this point, the `<footer>` tag represents the footer of this web page. However, it can also be used to represent the footer of any other section of a web page.

The file should now look like this:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">

    <title>Web Development Workshop!</title>
  </head>

  <body>
    <header>
      <img class="logo" src="logo.png" alt="Knight Hacks logo">
    </header>

    <main>
      <h1>Knight Hacks Workshop!</h1>

      <p><button id="kh-button">Click me!</button></p>

      <p id="hidden-message" class="hidden">Happy Halloween!</p>
    </main>

    <footer>
      <p>Made with love by the Knight Hacks club!</p>
    </footer>
  </body>
</html>
```

Pat yourselves on the back, as you've just finished writing the markup for an entire web page! Now, save the file and open it in your browser of choice.

![alt text](/pics/workshops/web/html-completed.png "Base KH workshop site")

As you can see, while we've written all of the markup needed for a page, it's still unstyled. And that brings us to...

# CSS <small>(Cascading Style-Sheets)</small>
![alt text](/pics/workshops/web/family-guy-css.gif "Peter Griffin struggling to comprehend CSS")

CSS is the standardized stylehseet language used to describe how HTML elements will be rendered by the browser. Despite what the gif is implying, CSS isn't difficult to master at all; just confusing (mainly because of [one specific thing](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)).

Before we write some CSS, add this HTML on the line after the closing `<title>` tag:

```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300,400,700">
<link rel="stylesheet" href="styles.css">
```
These `<link>` elements are referencing external stylesheets, in this case a stylesheet to use some fonts from Google, and a stylesheet we will be editing.

Now, open `styles.css` in the root directory of our project and let's get going.

```
body {
  font-size: 14px;
}
```

We clearly aren't starting with much to work with here, but that's okay! Right now, this CSS selector is targeting the `<body>` element and applying a property to it, the font-size property to be exact. Let's add some base styling to the body of the web page:

```
body {
  padding-top: 32px;

  background: #000 url('http://knighthacks.club/assets/img/space-bg.png');

  font-family: "Raleway", sans-serif;
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;

  color: #fafafa;
}
```

Three new CSS properties are now being added to this selector.

`padding-top` - This adds a top padding to the content of the element being selected.

`background` - This applies various background styles to an element, in this case it's being given a color of #000 (black) and the Knight Hacks space image.

`font-family` - This assigns a typeface for the text of an element to be rendered in. The values are comma separated and the web browser will go through each value in the list until it can render a font that's installed on the computer or can be downloaded using a [certain rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face).

`font-size` - This sets the size of text within an element.

`text-align` - This determines the alignment of inline content/text within an element.

`text-transform` - This specifies how text within an element should be capitalized.

`color` - This sets the foreground color of an elements text content.

We're off to a great start! Refresh your browser tab and you'll see these changes instantly take effect! But, let's not let that stop us, let's style the rest of the content; that will involve writing some new selectors. Add the following CSS after the body selector.

```
body {
  padding-top: 64px;

  background: #000 url('space-bg.png');

  font-family: "Raleway", sans-serif;
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;

  color: #fafafa;
}

header .logo {
  width: 275px;
  height: 73px;
}

main h1 {
  margin-bottom: 32px;

  font-size: 24px;
}

main p button {
  padding: 16px 32px;

  font-family: "Raleway", sans-serif;
  font-size: 20px;
  text-transform: uppercase;

  background: #16a9c1;
  border: 0;
  border-radius: 4px;
  color: #fafafa;
}

footer p {
  margin-top: 32px;
}

.hidden {
  display: none;
}
```

Let's explain these selectors and the styles that are being applied to them a bit:

`header .logo` - This is selecting ***all*** elements with the class "logo" that is a child of the `<header>` element. In this case, it is selecting the Knight Hacks logo because that `<img>` tag for it has a class of "logo". This selector is currently applying a `width` and `height` property to the image.

`main h1` - This is selecting ***all*** `<h1>` elements that are a child of the `<main>` element. We're applying the `margin-bottom` and `font-size` properties to the `<h1>`. We've covered what `font-size` does; the `margin-bottom` property is pushing all content after the `<h1>` element `32px` away from it.

`header p button` - This is selecting ***all*** `<button>` elements that are a child of ***all*** `<p>` elements that are a child of the `<main>` element. As you can see, we've added quite a few properties to this element, so let's go over the properties that haven't been discussed already: `padding` adds inner padding on all sides of an element around its text content, `border` is used to control various border styles that can be applied to an element, in this case we're just removing the border that is applied to buttons by default altogether.

`footer` - All we're doing here is adding a top margin which is pushing the footer `32px` away from the rest of the content.

`.hidden` - This is a CSS class that will apply its properties to any element that contains the name of this class in its `class` attribute. The `display` property this class uses controls the rendering box of the element its being applied to. We've set it to `none` which simply hides the element.

Something important to keep in mind: The difference bettwen classes and ids in CSS is that classes may be applied to multiple elements on the same page, while ids may only be applied to *one* element on a page.

Save your file, and refresh your browser tab.

![alt text](/pics/workshops/web/css-completed.png "Styled KH workshop website")

Congratulate yourself once more, as you've now styled your first web page! Isn't it pretty? You may notice that the button *still* doesn't do anything when clicked and that the `<p>` element containing the "Happy Halloween!" message isn't visible anymore. Let's take care of that...

# JavaScript <small>(JS)</small>
JavaScript (commonly referred to as JS) is a high-level, interpreted, and object-oriented programming language. All modern web browsers support JavaScript and almost all websites on the Internet utilize it. JavaScript is run on the client side of a web page/application and is used to program how elements or even entire web pages react when certain events happen. JavaScript can also be used in many [non-browser based environments](https://nodejs.org/en/).

We're going to use JavaScript to make the button on our web page display a message when clicked!

We need to add one more bit of HTML to our document before really beginning. So, insert this tag before the closing `<body>` tag in our HTML:

```
<script src="scripts.js"></script>
```

The `<script>` tag can do two things. It can reference an external script to be executed or execute any script between the opening in closing tab. For what we're doing, we're just going to reference the `scripts.js` file that's sitting in the root directory of this project.

Now, let's open `scripts.js` and write some code! Add this code into the blank file:

```
document.addEventListener('DOMContentLoaded', function() {

});

```

Let's break this down a bit:

`document` is an object interface representing the entire web page. `.addEventListener()` is a method we are calling on the `document` object. The first argument in `.addEventListener()` is the type of event we want to happen, in this case we're listening for `'DOMContentLoaded'` which is the event that fires when the web page is finished loading. The second argument is referred to as a "listener", it is most commonly an anonymous function. This "listener" receives a notification when the event specified happens and then executes.

Now, we're going to write the code that really matters. Add this code into the function being passed as the second argument:

```
document.querySelector('#kh-button').addEventListener('click', function() {
  document.querySelector('#hidden-message').classList.toggle('hidden');
});
```

We are now calling another method of the `document` object: `.querySelector()`. This method returns the first element that is a child of whatever element it's being invoked on. In our case, it will return our `<button>` element with the `id` of `kh-button` that we gave it earlier. Afterwards, we chain the `.addEventListener()` method on that button to listen for when it's clicked.

When the button is clicked, another `.querySelector()` method called from the `document` object will look for any element with an id of `#hidden-message`. Then, by chaining the `.classList` property we get the list of classes `#hidden-message` has in its class attribute. Finally, we call the `.toggle()` method on that class list with `'hidden'` being passed in as an argument. The `.toggle()` method will add or remove the `.hidden` class from the element based on whether or not its already set.

Your scripts.js file should now look like this:

```
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#kh-button').addEventListener('click', function() {
    document.querySelector('#hidden-message').classList.toggle('hidden');
  });
});
```

Save it, refresh your browser tab for the last time, and then click the button.

![alt text](/pics/workshops/web/js-completed.png "Styled KH workshop page with a JavaScript alert box")

Ta-da! You've now completed your first web page using HTML, CSS, and JavaScript! This is only the tip of the iceberg, so please give the additional resources linked below a read to continue learning!

## Additional resources
[Mozilla Documentation on HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

[Mozilla Documentation on CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

[Mozilla Documentation on JavaScript](https://developer.mozilla.org/en-US/docs/Web/JS)

[Mozilla Web Developer Guide](https://developer.mozilla.org/en-US/docs/Web/Guide)

... Mozilla just has really amazing documentation, okay?

[Code Academy](https://www.codecademy.com/)


[HTMl/CSS Code Guide](http://codeguide.co/)

[Google Web Fundamentals](https://developers.google.com/web/fundamentals/)

[Stack Overflow ;^)](https://stackoverflow.com/)
