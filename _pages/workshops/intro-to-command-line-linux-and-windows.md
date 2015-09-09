# Linux or OSX

Start by opening Terminal. Any command you type should be followed by the `enter` key to execute that command in the shell.

## Basic commands

Try running these commands:

* `pwd`: Print working directory, i.e. the directory we are currently in
* `cd`: Go somewhere on your filesystem
* know: .. (up one directory) and . (current directory)
* `ls`: See what is in that folder
* `clear`: Get that junk off the screen
* `mkdir`: Create a folder
* `rm`: Delete a file

### Arguments
These are additional parameters for the command or program
* `ls -la`: more verbose
* `rm -r`: Recursively delete something

### Redirection
* `echo thing`: Prints out `thing` to the terminal
* `echo "Hello, world!" > guestbook.txt`: Writes "Hello, world!" to that file

Run `cat guestbook.txt` to print out the contents of that file

* `ls -la > directory.txt`: Writes the output of `ls -la` to directory.txt

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

```
touch somefile # creates somefiles
ls -la | grep somefile
```

## Chaining things together

Putting `&&` between two commands will execute both commands if the first command succeeds.

```
echo hi && echo hello
```

You can chain them as many times as you like:
```
echo hi && echo hello && echo goodbye && ls -la
```

Note that subsequent commands will not run if a proceeding command has failed to execute (has a non-zero return value)

```
gcc notarealfile && echo "Compiled!"
```

You can also chain pipes together:

```
ps aux | grep root | wc -l
# ps aux: list out all the processes currently running
# grep root: print only lines containing root
# wc -l: print out the number of lines
```

You can also redirect the output after piping:

```
ps aux | grep root | sort > sorted_root_processes.txt
```

## Next steps

* To scroll through large output, pipe it into less or more, i.e.
```
cat /var/log/system.log | more
# Press q to quit
```
* Note that almost any command in the form of:
```
cat file.txt | some_program
```
Can be rewritten as
```
some_program < file.txt
```
