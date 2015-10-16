---
title: Vim Workshop
slug: workshops/vim-workshop
date: 10/16/2015
template: workshop
---

Welcome to the Knight Hacks Vim workshop!

This workshop is to get you comfortable using vim.

# What is Vim?
It's an advanced text editor built for fast editing in a command line interface. The advantage of using Vim is the ability rapidly write and refactor text without using a mouse.

# Getting Started

First lets download a text file that we'll be using later. Run the following command in your terminal.

* `curl http://knighthacks.club/vim/vim_practice.txt -o vim_practice.txt`

Second make sure you have Vim installed on your machine. Run the following command.

* `vim --version`

The first line should say `VIM - Vi Improved 7.x...`  
If you don't see that, follow the directions below to install Vim, otherwise skip to **"Normal and Insert Mode"**.

### Windows users
Make sure you have Git for Windows installed. You can download it [here](https://git-scm.com/download/win).
Use GitBash which was added to your programs after you've installed Git for Windows.

### Mac Users
You can install Vim using brew. If you don't have brew you can install it with the following command.

* `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Once homebrew is installed, you can install vim with the following command.

* `brew install vim`

### Linux Users
Ubuntu, Linux Mint, Debian

* `sudo apt-get install vim`

CentOS, Fedora, redhat

* `sudo yum install vim`

**Side Note: gVim**  
You also have the option to install gVim, which is the graphical clone of vim. It has file menus and such like notepad++, for this workshop we'll be using vim from the command-line.  You can download gVim [here](ftp://ftp.vim.org/pub/vim/pc/gvim74.exe).

# Normal and Insert Mode

Start Vim by with the `vim` command in your terminal.

By default, Vim starts in Normal mode. In this mode, the keys on your keyboard perform certain actions like moving the cursor, navigating the document, or changing the contents. If you start typing right away in this mode, you'll accidently fire one of these actions.

To type into the editor with your own contents, you have to change to Insert mode. In Insert mode, you can type regularly as if you were in notepad or nano. Type `i` to enter Insert mode. You can return to Normal mode with `esc`.

# Exiting Vim

Now that you're able to type into vim. Lets try exiting vim. Exiting and saving files are done with Vim commands, which can only be called from Normal mode. Make sure you're in Normal mode by hitting `esc`.

Below are the commands for exiting and saving.

* `:w filename` Save As filename
* `:w` Save
* `:wq` Save and Quit
* `:q` Quit
* `:q!` Force quit

To open a file with Vim, you just need to run `vim` followed by the name of the file.

# Navigating and Searching

### h j k l
Next we'll get comfortable using the 4 movement keys.

* `h` Move Cursor Left
* `j` Move Cursor Down
* `k` Move Cursor Up
* `l` Move Cursor Right

We'll use these keys to navigate through a maze.  
Open the practice text file in vim with

* `vim vim_practice.txt`

We'll be using this file to practice. Start with Exercise 1.

### w W b B e E

The next keys are used to jump quickly word by word. Vim defines a word as a string of alphanumeric or underscore characters. Everything else is considered a separate word in vim.

* `w` Jump to the start of the next word
* `b` Jump to the start of the previous word
* `e` Jump to the end of the next word.

You can also jump even faster by whitespace. These keys operate the same as the ones above but jump with respect to whitespaces.

* `W` Jump to the start of the next word after a whitespace.
* `B` Jump to the start of the previous WORD after a whitespace
* `E` Jump to the end of the next word after a whitespace.

Move on to Exercise 2 in the practice file.

### gg G *n*G

The next keys allow you to jump to the start/end of the document or some specific line.

* `gg` Jump to the first line of the file
* `G` Jump to the last line of the file

Before you try out this next key, turn on line numbers. Make sure you're in Normal mode then type `:set number`.

* `nG` Jump to line n, where n is some line number

Try out Exercise 3 in the practice file.

### f t / ? n N

These next keys help you find specific characters and words in a file.

* `fc` Jump to the next occurance of character `c` on the current line
* `tc` Jump just before the next occurance of character `c` on the current line

When using `f` or `t` if the cursor doesn't jump, the character either isn't on that line or the cursor has gone past that character.

These next keys search for words and characters. They even accept regex.

* `/word` Jump to the next occurance of `word`
* `?word` Jump to the previous occurance of `word`
* `n` Jump to the next occurance of `word` after doing `/` or `?`
* `N` Jump to the previous occurance of `word` after doing `/` or `?`

When you use `/` or `?`, it'll appear on the lower bar of the window. There you can type out what you want to find. Use `n` and `N` to jump through the search results.

Go to Exercise 4 in the practice file.

### ^ $ 0

These next keys help you jump between the end and start of a line.

* `^` Jump to the first character in the current line
* `$` Jump to the last character in the current line
* `0` Jump to the beginning of the current line

Continue to Exercise 5.

# Editing and Making Changes

Now that you've gotten familiar with basic movment keys in Vim, lets make actual changes.  With the right keys you can rapidlly refactor code without touching the mouse.

### u

Moving forward, we'll be making changes to the practice file so before we continue, lets go over how to undo changes.

* `u` Undo
* `Crtl-R` Redo

Vim keeps the undo history of your file as long as it is open.

### y p

These next keys are really powerful and have several variations.

Lets start with yank.  
In Vim, copying is known as yanking. It's done with the `y` key, but `y` alone doesn't do much.

* `yy` or `Y` Yank a line
* `nyy` or `nY` Yank n number of lines below the cursor, including the current line
* `yw` Yank a word after the cursor
* `yiw` Yank a word containing the cursor

Now you'll need to put what you've yanked.

* `p` Put (paste) after the cursor
* `P` Put (paste) before the cursor

**Side Note**: By default yanking text doesn't copy it to the system clipboard, it only exists in vim.
However, it is possible to configure vim to yank to the clipboard. See section on **vimrc** for more details.

Try out yanking and putting in Exercise 6.

### d x c s

The next keys involve deleting and changing content.  
Deleting in Vim behaves like Cutting in other programs. When you delete something in Vim you can put it back with `p`.

* `dd` Delete a line (shifts everthing upwards)
* `ndd` or `nD` Delete n number of lines below the cursor, including the current line
* `dw` Delete a word
* `x` Delete a character

Changing is exactly like deleting except when you change text, Vim goes into Insert Mode, which is where you can type your own text.
In Insert Mode you can replace the deleted content.

* `cc` Change (replace) entire line
* `cw` Change to the end of the word
* `s` Change a character

Practice deleting and changing in Exercise 7.

### Visual Mode

Visual mode is a way to highlight/select several lines or characters.  
This works exactly like using the mouse to highlight text, except here you use the `hjkl` movement keys to select what you want to highlight.

* `v` Starts visual mode, which highlights texts
* `V` Starts linewise Visual mode, which only highlights lines

This mode is very useful because you can `y` yank or `d` delete the highlighted text.

Try out Visual mode in Exercise 8.

### A I o O

`I` and `A` behaves exactly like `^` and `$` respectively, except these keys drop you into Insert mode. These keys are useful for when you forget to add a semicolon at the end of a line or you forget to include the return type of a function.

* `I` Jump to the first character in the line and go into Insert Mode
* `A` Jump to the last character in the line and go into Insert Mode

These next keys create newlines above/below the cursor and drop you into Insert mode.

* `o` Create a newline below the cursor and go into Insert Mode
* `O` Create a newline above the cursor and go into Insert Mode

Try out these keys in Exercise 9.

### << >> J

Next are keys that are commonly used in refactoring code.

Shifting is used to indent a line. These two shift keys can also be used in visual mode, to shift blocks of highlighted text.

* `>>` Shift right
* `<<` Shift left

`J` comes in very handy when merging lines together. It takes the line below and shifts it upward to the right of the cursor.

* `J` Join line below with current line

Go to Exercise 10 to try these keys out.

# .vimrc

.vimrc is the Vim configuration file (also named __vimrc on Windows).  
This file is located in your home directory. You can find the location of your .vimrc by running the following command in the terminal.

* `vim --version | grep vimrc`

In this file you can set a persistent configuration for your Vim installation.  
For example, if `set number` is in your .vimrc, then you won't have to do `:set number` to display the line numbers everytime you open vim.
There's so many ways you can configure your Vim. This [link](http://vim.wikia.com/wiki/Example_vimrc) is an example .vimrc with a description for each setting.

To configure Vim to yank to the system clipboard you'll need to include `set clipboard=unnamed` in your .vimrc. See `:help clipboard` for more details.

# Resources
* [r/vim](https://www.reddit.com/r/vim/) - Vim subreddit
* [Vim wikia](http://vim.wikia.com/wiki/Vim_Tips_Wiki) - A wikia page for Vim with tips and tricks
* [Vim Adventures](http://vim-adventures.com/) - A fun game for learning vim. However, it's not completely free.
* [Vim Golf](http://www.vimgolf.com/) - Vim challenges that are to be completed in the least amount of keystrokes.
