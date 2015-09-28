---
title: Command Line Workshop
slug: workshops/command-line
date: 9/11/2015
template: workshop
---
# Linux or OSX

Start by opening Terminal. Any command you type should be followed by the `enter` key to execute that command in the shell.

## Basic commands

Try running the commands after the `$` by typing them into the terminal and pressing enter.

Similar output to what you will see will be displayed after this line.

Anything starting with a # is a comment.

```
$ echo Hello
Hello
```

In the above example, we've run `echo` with the argument `Hello`, and the output `Hello` is displayed on the next line. This is the format that will be used for the rest of the workshop, and should match many examples online.

```
$ pwd
/Users/jonathan
# This prints the working directory, which tells us what folder on the computer the terminal is acting on.
```

Cool. Now we know where we are. Now let's go to another directory:

```
$ cd Desktop
# Now we're in the folder called Desktop that was inside the previous directory
$ pwd
/Users/jonathan/Desktop
# Terminology note: In this case, "cd" is a command and "Desktop" is an argument or parameter to that command.
```

If we ever want to go *up* a directory, note that most operating systems denote `..` as the parent directory. Try it out:

```
$ cd ..
$ pwd
/Users/jonathan
# Now we're back where we started!
```

Now that we can switch between folders, let's see what's inside them:

```
$ ls
Applications                 Tesla Model S P85D Insane Mode Flying Loose Items in Slow Motion-Y8-S7FghyEA.mp4
Desktop                      Testing of Tesla Model X-XTfqVQ1n5P4.mp4
Documents                    Things
Downloads                    android

# ls spits out a listing of what is in that directory
# The same contents should appear if you were to open the folder in Finder.
# Lots of crap on this computer!
```

Cool. Now let's make our own folder for experimenting.

```
$ cd ~/Desktop
# Note that ~ is shorthand for the current user's home directory -- this is equivalent to typing out /Users/jonathan/Desktop
$ mkdir knighthacks
$ cd knighthacks
$ pwd
/Users/jonathan/Desktop/knighthacks
```

Awesome! We've got directory navigation down and have our own folder. Now let's manipulate some files.

```
$ touch myfile
# This will create an empty file called `myfile`
$ ls
myfile
# Let's make a copy of that file
$ cp myfile myfile2
$ ls
myfile myfile2
# Now let's rename the new copy
$ mv myfile2 awesome
$ ls
awesome myfile
# We don't really need two blank files, so let's delete one with rm:
$ rm myfile
$ ls
awesome
# Note that many of these commands are just shortened versions of the words they represent: copy, move, and remove
```

Great job! If you have any questions at this point, ask someone! Otherwise, we've got a lot of unnecessary stuff on the screen, so let's go ahead and run `clear` to clean up the terminal display.

### Optional Arguments

Many commands or programs have additional parameters you can pass them for different behaviors:

```
$ ls -la
total 0
drwxr-xr-x    3 jonathan  staff   102 Sep 10 22:34 .
drwx------+ 160 jonathan  staff  5440 Sep 10 22:27 ..
-rw-r--r--    1 jonathan  staff     0 Sep 10 22:32 awesome

# Now we have a full list of what is in the directory and what properties each file has, instead of the default output we've seen from ls before.
```

### Redirection

Up until now, we've seen commands output directly to the terminal. But if we so desired, we could *redirect* their output into a file:

```
$ echo "Hello, world!" > guestbook.txt
$ ls
awesome       guestbook.txt
# Note that the usual output of `echo` was not displayed in our terminal, but instead a file called guestbook.txt was created.
# We can output the contents of the file by using cat:
$ cat guestbook.txt
Hello, world!
```

More fun with this:

```
$ ls -la > directory.txt
$ cat directory.txt
total 8
drwxr-xr-x    5 jonathan  staff   170 Sep 10 22:46 .
drwx------+ 160 jonathan  staff  5440 Sep 10 22:27 ..
-rw-r--r--    1 jonathan  staff     0 Sep 10 22:32 awesome
-rw-r--r--    1 jonathan  staff     0 Sep 10 22:46 directory.txt
-rw-r--r--    1 jonathan  staff    14 Sep 10 22:42 guestbook.txt
```

You can also try opening `directory.txt` in TextEdit or another text editor; the contents of the file will be the same as what was output with `cat`.

### STDIN, STDOUT, STDERR

A few quick notes that will help you moving forward:

* `stdout` is the standard output of a program. This will be printed to the shell if executed without redirection, or written to the file denoted after `>`.
* `stderr` is the standard *error* output of a program. This is printed to the shell, but will not be redirected using `>`. If you wish to redirect the errors somewhere, try using `2>`:
```
gcc some_fake_thing_to_make_error 2> /tmp/errors.txt
cat /tmp/errors.txt
```
To redirect stderr into stdout so you can have a single stream, use `2>&1`:
```
gcc some_fake_thing_to_make_error 2>&1
# or to a file, make sure the stdout redirect is defined first!
gcc some_fake_thing_to_make_error >somefile.txt 2>&1
```

* `stdin` refers to the input given to a program while it is running. This could be typed by the user or fed in through a pipe (see below).

## Pipes

Pipes allow sending the output of one program/command to the input of another.

A good case in point is `grep`, which will filter out any lines piped into it that do not contain the query string

```
$ ls -la | grep guest
-rw-r--r--    1 jonathan  staff    14 Sep 10 22:42 guestbook.txt
```

In that example, we took the full output of `ls -la` and fed it into grep, which then only spat out the lines that contained what we were looking for. A good use case for this is when searching through log files for a specific pattern.

## Chaining things together

Putting `&&` between two commands will execute both commands if the first command succeeds.

```
$ echo hi && echo hello
hi
hello
```

You can chain them as many times as you like:

```
$ echo hi && echo hello && echo goodbye && ls -la
hi
hello
goodbye
total 16
drwxr-xr-x    5 jonathan  staff   170 Sep 10 22:46 .
drwx------+ 160 jonathan  staff  5440 Sep 10 22:27 ..
-rw-r--r--    1 jonathan  staff     0 Sep 10 22:32 awesome
-rw-r--r--    1 jonathan  staff   304 Sep 10 22:46 directory.txt
-rw-r--r--    1 jonathan  staff    14 Sep 10 22:42 guestbook.txt
```

Note that subsequent commands will not run if a proceeding command has failed to execute (has a non-zero return value)

```
gcc notarealfile && echo "Compiled!"
```

You can also chain pipes together:

```
$ ps aux | grep root | wc -l
      86
# ps aux: list out all the processes currently running
# grep root: print only lines containing root
# wc -l: print out the number of lines
```

You can also redirect the output after piping:

```
$ ps aux | grep root | sort > sorted_root_processes.txt
```

## Long running processes

So far, all the programs and commands we've run have terminated as soon as they finished outputing. This is not always the case:

```
$ ping knighthacks.org
# This program will keep running until it is terminated. Type Ctrl-C to terminate the program.
$ top
# This program has its own interface. Ctrl-C or q should kill it and bring us back
```

Congratulations! That pretty much sums up the basics! Give yourself a pat on the back, or whatever your preferred method of celebrating is.

### Backgrounding

This isn't really an intro topic, but if you're comfortable with the previous material, here's some added fun:

Sometimes you want to switch between long running processes. You can suspend programs using Ctrl-Z:

```
$ ping 8.8.8.8
# Lots of output will keep streaming. Press Ctrl-Z to suspend it. At this point, we can run other commands without effecting it.
$ echo hi
# Now let's bring it back
$ fg
# If we wanted to throw it into the background and keep it running, use bg instead of fg.
# Since backgrounding a program that outputs to `stdout` is almost certainly going to be annoying, run `fg` again, then Ctrl-C to kill it.
```

## One last tip

To scroll through large output, pipe it into less or more, i.e.

```
$ cat /var/log/system.log | more
# Press q to quit
```

# Windows

Start by opening Command Prompt. Any command you type should be followed by the `enter` key to execute that command in the shell.

## Basic commands

Try running the commands after the `>` by typing them into the terminal and pressing enter.

Similar output to what you will see will be displayed after this line.

Anything starting with a # is a comment.

```
> echo Hello
Hello
```

In the above example, we've run `echo` with the argument `Hello`, and the output `Hello` is displayed on the next line. This is the format that will be used for the rest of the workshop, and should match many examples online.

```
> cd
C:\Users\Jaxbot
# This prints the current directory, which tells us what folder on the computer the terminal is acting on.
```

Cool. Now we know where we are. Now let's go to another directory:

```
> cd Desktop
# Now we're in the folder called Desktop that was inside the previous directory
> cd
C:\Users\Jaxbot\Desktop
# Terminology note: In this case, "cd" is a command and "Desktop" is an argument or parameter to that command.
```

If we ever want to go *up* a directory, note that most operating systems denote `..` as the parent directory. Try it out:

```
> cd ..
> cd
C:\Users\Jaxbot
# Now we're back where we started!
```

Now that we can switch between folders, let's see what's inside them:

```
> dir
Volume in drive C has no label.
Volume Serial Number is 4622-33BF

Directory of C:\Users\Jaxbot

08/27/2015  10:04 PM    <DIR>          .
08/27/2015  10:04 PM    <DIR>          ..
08/26/2015  07:50 PM    <DIR>          Contacts
09/10/2015  04:09 PM    <DIR>          Desktop
08/26/2015  08:14 PM    <DIR>          Documents
08/30/2015  08:46 PM    <DIR>          Downloads
08/26/2015  07:50 PM    <DIR>          Favorites
08/26/2015  07:50 PM    <DIR>          Links
08/26/2015  07:50 PM    <DIR>          Music
09/10/2015  04:04 PM    <DIR>          OneDrive
08/30/2015  02:28 PM    <DIR>          Pictures
08/26/2015  07:50 PM    <DIR>          Saved Games
08/26/2015  07:50 PM    <DIR>          Searches
08/26/2015  05:16 PM    <DIR>          SkyDrive
09/10/2015  08:19 PM    <DIR>          Videos
		   0 File(s)              0 bytes
		  15 Dir(s)  172,907,671,552 bytes free

C:\Users\Jaxbot>
# dir spits out the contents of that directory
```

Cool. Now let's make our own folder for experimenting.

```
> cd Desktop
> mkdir knighthacks
> cd knighthacks
> cd
C:\Users\Jaxbot\Desktop\knighthacks
```

Awesome! We've got directory navigation down and have our own folder. Now let's manipulate some files.

```
> echo "test" > foo.txt
# This will create a file called `foo.txt` with the contents "test"
> dir
 Volume in drive C has no label.
 Volume Serial Number is 4622-33BF

 Directory of C:\Users\Jaxbot\Desktop\knighthacks

09/10/2015  08:36 PM    <DIR>          .
09/10/2015  08:36 PM    <DIR>          ..
09/10/2015  08:36 PM                 9 foo.txt
               1 File(s)              9 bytes
               2 Dir(s)  172,907,515,904 bytes free
# Let's make a copy of that file
> copy foo.txt bar.txt
> dir
 Volume in drive C has no label.
 Volume Serial Number is 4622-33BF

 Directory of C:\Users\Jaxbot\Desktop\knighthacks

09/10/2015  08:36 PM    <DIR>          .
09/10/2015  08:36 PM    <DIR>          ..
09/10/2015  08:36 PM                 9 foo.txt
09/10/2015  08:36 PM                 9 bar.txt
               2 File(s)              18 bytes
               2 Dir(s)  172,907,515,904 bytes free

# Now let's rename the new copy
> move bar.txt awesome.txt
> dir
 Volume in drive C has no label.
 Volume Serial Number is 4622-33BF

 Directory of C:\Users\Jaxbot\Desktop\knighthacks

09/10/2015  08:36 PM    <DIR>          .
09/10/2015  08:36 PM    <DIR>          ..
09/10/2015  08:36 PM                 9 awesome.txt
09/10/2015  08:36 PM                 9 foo.txt
               2 File(s)              18 bytes
               2 Dir(s)  172,907,515,904 bytes free
# We don't really need two blank files, so let's delete one with rm:
> del foo.txt
> dir
 Volume in drive C has no label.
 Volume Serial Number is 4622-33BF

 Directory of C:\Users\Jaxbot\Desktop\knighthacks

09/10/2015  08:36 PM    <DIR>          .
09/10/2015  08:36 PM    <DIR>          ..
09/10/2015  08:36 PM                 9 awesome.txt
               1 File(s)              9 bytes
               2 Dir(s)  172,907,515,904 bytes free
```

Great job! If you have any questions at this point, ask someone! Otherwise, we've got a lot of unnecessary stuff on the screen, so let's go ahead and run `cls` to clean up the terminal display.

### Optional Arguments

Many commands or programs have additional parameters you can pass them for different behaviors:

```
$ dir /B
awesome.txt
# Now we have a bare view of the directory, instead of the verbose default
```

### Redirection

Up until now, we've seen commands output directly to the terminal. But if we so desired, we could *redirect* their output into a file:

```
> echo Hello, world! > guestbook.txt
> dir /B
awesome.txt
guestbook.txt
# Note that the usual output of `echo` was not displayed in our terminal, but instead a file called guestbook.txt was created.
# We can output the contents of the file by using type:
> type guestbook.txt
Hello, world!
```

More fun with this:

```
> dir > directory.txt
> type directory.txt
 Volume in drive C has no label.
 Volume Serial Number is 4622-33BF

 Directory of C:\Users\Jaxbot\Desktop\knighthacks

09/10/2015  08:43 PM    <DIR>          .
09/10/2015  08:43 PM    <DIR>          ..
09/10/2015  08:36 PM                 9 awesome.txt
09/10/2015  08:43 PM                 0 directory.txt
09/10/2015  08:42 PM                16 guestbook.txt
               3 File(s)             34 bytes
               2 Dir(s)  172,907,233,280 bytes free
```

You can also try opening `directory.txt` in Notepad or another text editor; the contents of the file will be the same as what was output with `type`.

```
> directory.txt
# Notepad, or whatever the default editor is, should open and show that file contents.
```

### STDIN, STDOUT, STDERR

A few quick notes that will help you moving forward:

* `stdout` is the standard output of a program. This will be printed to the shell if executed without redirection, or written to the file denoted after `>`.
* `stderr` is the standard *error* output of a program. This is printed to the shell, but will not be redirected using `>`. If you wish to redirect the errors somewhere, try using `2>`:
```
> fake_program 2> error.txt
> type error.txt
'fake_program' is not recognized as an internal or external command,
operable program or batch file.
```
To redirect stderr into stdout so you can have a single stream, use `2>&1`:
```
> fake_program 2>&1
'fake_program' is not recognized as an internal or external command,
operable program or batch file.
# or to a file, make sure the stdout redirect is defined first!
> fake_program >error.txt 2>&1
```

* `stdin` refers to the input given to a program while it is running. This could be typed by the user or fed in through a pipe (see below).

## Pipes

Pipes allow sending the output of one program/command to the input of another.

A good case in point is `findstr` (similar to `grep` on Unix systems), which will filter out any lines piped into it that do not contain the query string

```
> dir | findstr guest
09/10/2015  08:42 PM                16 guestbook.txt
```

In that example, we took the full output of `dir` and fed it into `findstr`, which then only spat out the lines that contained what we were looking for. A good use case for this is when searching through log files for a specific pattern.

## Chaining things together

Putting `&&` between two commands will execute both commands if the first command succeeds.

```
> echo hi && echo hello
hi
hello
```

You can chain them as many times as you like:

```
> echo hi && echo hello && echo goodbye && dir
hi
hello
goodbye
 Volume in drive C has no label.
 Volume Serial Number is 4622-33BF

 Directory of C:\Users\Jaxbot\Desktop\knighthacks

09/10/2015  08:46 PM    <DIR>          .
09/10/2015  08:46 PM    <DIR>          ..
09/10/2015  08:36 PM                 9 awesome.txt
09/10/2015  08:43 PM               518 directory.txt
09/10/2015  08:36 PM                 9 foo.txt
09/10/2015  08:42 PM                16 guestbook.txt
09/10/2015  08:46 PM                98 test.txt
               5 File(s)            650 bytes
               2 Dir(s)  172,906,946,560 bytes free
```

Note that subsequent commands will not run if a proceeding command has failed to execute (has a non-zero return value)

```
> fake_program && echo "Compiled!"
```

You can also chain pipes together:

```
> dir | findstr DIR | sort
09/10/2015  08:46 PM    <DIR>          .
09/10/2015  08:46 PM    <DIR>          ..
# dir: list out directory
# findstr DIR: filter out any lines not containing DIR
# sort: take this filtered output that has been fed in and sort it
```

You can also redirect the output after piping:

```
> dir | findstr DIR | sort > sorted_directory.txt
```

## Long running processes

So far, all the programs and commands we've run have terminated as soon as they finished outputing. This is not always the case:

```
> ping knighthacks.org
# This program will keep running for a bit. Type Ctrl-C to terminate the program.
```

Congratulations! That pretty much sums up the basics! Give yourself a pat on the back, or whatever your preferred method of celebrating is.

## One last tip

To scroll through large output, pipe it into more, i.e.

```
> type C:\Windows\setupact.log | more
# Press q to quit
```
