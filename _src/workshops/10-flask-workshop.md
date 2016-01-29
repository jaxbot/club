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

### Table of contents
- [Prerequisites](#prerequisites)
- [Hello, World](#hello-world)

### Prerequisites
Refer over to [my repo](https://github.com/maxcell/flask-workshop/blob/master/README.md)

### Hello, World
The first thing we want to make sure we do is setup a folder so let's go ahead
and make a folder called `practice-flask`. Inside of this folder, we are going
to hold all of the pieces to the application we want. We want to be sure to have
a `virtualenv` ready, so go ahead and write out `virtualenv venv`. This will
create a folder `venv/`. Whenever we want to activate our `virtualenv`, we will
write out `. venv/bin/activate`. With that, you are ready to go ahead and install
Flask! `pip install Flask` or `python -m pip install Flask`.

Finally, from there we can just go ahead and open our favorite text editor
and we can make some progress to our first Flask application. We are going to
need a "server" and we will name it `routes.py`. Inside of there will be several
things that we will walk through.
```
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

The last portion `if __name__ == '__main':` is actually to ensure the fact that
we run this as our server through the Python interpreter instead of it being used
as our imported module. And then once we run `python routes.py`. It will load up
into `localhost:5000`. And we should see our lovely `Hello World!`
