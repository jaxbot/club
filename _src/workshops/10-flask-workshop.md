---
title: Introduction to Flask
slug: workshops/flask-workshop
template: workshop
author: Maxcell Wilson
---

# Flask, the Web Framework

Welcome to the Knight Hacks Introduction to Flask workshop! We all know that
JavaScript is taking over the world with all of the different types of frameworks
that exist. Today, however, we are going to show the power of Python.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Hello, World](#hello-world)
- [Baby Steps to MVC](#baby-steps-to-mvc)

### Prerequisites
You are probably super excited to start learning how
to use a Flask, the framework, of course. But before
you can start, you want to be sure to have everything working,
especially if you want to keep up.

There are pretty much four important things that you are going to
need to have installed: Python (obviously), pip (a Python package
management system), virtualenv (the virtual environment we will use Flask in),
and Flask (which is why you are even here).

- Make sure to have the latest version of Python v2 installed. (As of Jan. 28th, Python2.7.11).
  - You are able to use Python3 as well but be sure to have the latest. (As of Jan. 28th, Python3.5.1)
- Make sure to have `pip` installed, if you have anything greater than 2.7.9, you should have it installed already.
  You can actually update this by doing  (OSX) `pip install -U pip` or `python -m pip install -U pip`
  - If you use `python3`, you may need to utilize `pip3` or `pip` depending if you are Unix or Windows.
- Make sure to have `virtualenv`. We install this with `pip install virtualenv` or `pip3 install virtualenv`
  depending on Python2 or Python3

```
# *** Don't care too much to read my blob? Come over here ***
# Python2 (similar to Python3)
# If python wasn't already there, and you have Homebrew
$ brew install python
$ pip install -U pip
$ pip install virtualenv
```
- If you are on Windows, take a look at [@jaxbot's instructions](https://gist.github.com/jaxbot/47ec564e2712e3c75d42).
Practically the same instructions but may be a bit clearer.

And now we are ready to go! Just got to install Flask and that is gonna be a part
of this workshop as well!


### Hello, World
Let's set up a new folder `practice-flask`, our `virtualenv`, and `Flask`:
```
$ mkdir practice-flask
$ cd practice-flask/
$ virtualenv venv
```
With our `venv` we are going to be actually using this as a virtual environment
(huh, `virtualenv ~> virtual environment`). Let's move onto getting our Flask app started:
```
$ . venv/bin/activate
# (If on windows you may need to do . venv\Scripts\activate instead)
$ pip install Flask
# (Potentially may need -m pip install Flask)
$ touch routes.py
```
Finally, from there we can just go ahead and open our favorite text editor
and we can make some progress to our first Flask application. We are going to
need a "server" and we will name it `routes.py`. Inside of there will be several
things that we will walk through.
```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
```

The line `from flask import Flask` is a syntax from Python. And so we are taking
`Flask` the module from the `flask` package. And we will be doing that with multiple
different modules with `flask`. Not only that, when you get to development, you will
be using all sorts of different modules and packages. This is because someone out
there has been working on the same problem you have been but has made a solution.

From there, we talk about the `app = Flask(__name__)` portion. This is creating an
instance of our `Flask` class. The first argument passed in will be the name of the
module or package. Using the `__name__` is dependent on whether or not this is being
used as an application or being imported as a module. We don't want this to run on
its own if this is intended to be a module.

The `@app.route('/')` is known as a function decorator. This particular one will actually
bind the function we put underneath with it and then return out the view we give
it. So what we are saying is whenever we go to this route, we will load up this view.
We need to be sure to have our function returning something, our program will cry
at us if we don't have anything coming from it.

The last portion `if __name__ == '__main':` is actually to ensure the fact that
we run this as our server through the Python interpreter instead of it being used
as our imported module. And then once we run `python routes.py`. It will load up
into `localhost:5000`. And we should see our lovely `Hello World!`

### Baby Steps to MVC
At this point, we actually have a lot of awesome skills to getting us to working
with MVC for Flask. We already know pretty basic pieces to getting our views up.
Let's change our view to handle `variable routing`.

```python
@app.route('/hello')
@app.route('/hello/<name>')
def greetings(name="World"):
    return 'Hello {}'.format(name)
```
Here, what we are doing is allow us to create a new route for us to travel to.
So when we go to `localhost:5000/hello`, we actually see a new view with `Hello World`.
If we travel to a new route `localhost:5000/hello/Robot` and it will say `Hello Robot`.
```python
@app.route('/add_num/<num1>/<num2>')
def add_num(num1, num2):
  return '{} + {} = {}'.format(num1, num2, num1 + num2)
```
That's interesting, we are "adding" '2' + '3' and get "23"
