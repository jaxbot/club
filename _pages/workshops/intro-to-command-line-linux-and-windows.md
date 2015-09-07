# Linux or OSX

Start by opening Terminal. Any command you type should be followed by the `enter` key to execute that command in the shell.

## Basic commands

Try running these commands:

`pwd`: Print working directory, i.e. the directory we are currently in
`cd`: Go somewhere on your filesystem
- know: .. (up one directory) and . (current directory)
`ls`: See what is in that folder
`clear`: Get that junk off the screen
`mkdir`: Create a folder
`rm`: Delete a file

Arguments: additional parameters for the command or program
`ls -la`: more verbose
`rm -r`: Recursively delete something

Redirection:
`echo thing`: Prints out `thing` to the terminal
`echo "Hello, world!" > guestbook.txt`: Writes "Hello, world!" to that file
Run `cat guestbook.txt` to print out the contents of that file

`ls -la > directory.txt`: Writes the output of `ls -la` to directory.txt

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
echo
```

# Next steps

* To scroll through large output, pipe it into less or more, i.e.
```
cat /var/log/system.log | more
# Press q to quit
```
* Read about the useless use of cat

