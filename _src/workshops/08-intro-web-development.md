---
title: Intro to Web Development
slug: workshops/intro-web-development
date: 10/30/2015
template: workshop
---

Welcome to the Knight Hacks Intro to Web Development workshop! We're going to cover the basics of HTML, CSS, and Javascript while building a simple Knight Hacks styled landing page.

First, you'll need to clone down this repo: `git clone git@github.com:KnightHacks/web-dev-workshop.git`

These are the files you will be using to build the landing page. Now, open up the folder the repo was cloned down into in your text-editor/IDE of choice, open "index.html" in your browser, and let's begin!

# HTML <small>(HyperText Markup Language)</small>
HTML is the standardized markup language used in the creation of web pages; the most basic building block. Web browsers read HTML code and render it into web pages. However, it only describes the structure and the semantic content of a web page.

Open "index.html" in your text-editor/IDE. You'll notice there is some HTML within the file already and that your web browser is already rendering a web page.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">

  </head>

  <body>
    <header>

    </header>

    <main>
      <section>

      </section>
    </main>

    <footer>

    </footer>
  </body>
</html>
```

Off the bat there are quite a few things missing here, so let's add them in!

First of all, we need a title for this web page. Easy enough! Simply add in a `<title>` tag between the two `<header>` tags, like so:

```
<head>
  <title>Web Development Workshop!</title>
</head>
```

Refresh your browser tab. The web browser will now read the string between the opening `<title>` tag and the closing `</title>` tag and assign that string as the title of the web page. Almost all HTML tags have matching closing tags ([with some exceptions](http://webdesign.about.com/od/htmltags/qt/html-void-elements.htm)), so don't forget to include them when writing your markup!

Now we'll need a header, some content, and a footer.

# CSS <small>(Cascading Style-Sheets)</small>
![alt text](https://raw.githubusercontent.com/jglovier/gifs/gh-pages/web-dev/family-guy-css.gif "Peter Griffin struggling to comprehend CSS")

Despite what the gif is implying, CSS isn't difficult at all; just confusing.

# Javascript <small>This ain't an abbreviation!</small>
lololololol

## Additional resources
Expand yo DOM ;^)
