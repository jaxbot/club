---
title: Advanced Git Workshop
slug: workshops/advanced-git
date: 10/09/2015
template: workshop
---

Start by opening Terminal (OSX/Linux) or GitBash (Windows). Any command you type should be followed by the `enter` key to execute that command in the shell.

# Stashing

Let's say you're in the middle of editing a file and you

# Partial commits

Let's say you made a few changes but want to split up your commit, since some of the changes aren't related to the others.

```
# Changes to be committed:
#       modified:   fib.c
#
# Changes not staged for commit:
#       modified:   fib.c
```

# Rebasing

Rebasing is useful for rebuilding history.

## Interactive rebasing

Interactive rebasing allows you to edit the history of a repo to your liking.

## Undoing a rebase

reflog

# Bisecting

Bisecting preforms a binary search to help introduce what commit caused a bug.

```
$ git bisect start
$ gcc fib.c -o fib && ./fib
6
# The answer should be 55, not 6, so this commit is clearly bad
$ git bisect bad
# Let's go somewhere that we know is good. 5 versions back will suffice
$ git checkout HEAD~5
$ gcc fib.c -o fib && ./fib
55
# Looks good! Let's tell git
$ git bisect good
Bisecting: 2 revisions left to test after this (roughly 1 step)
[282adb128c12631e7956329f353a2980eb160bc4] Add useless comments

$ gcc fib.c -o fib && ./fib
55
# This one is also good!
$ git bisect good
Bisecting: 0 revisions left to test after this (roughly 1 step)
[1ae25e7fd6730b59711a18bfa58e9725e7d3c2a9] Clean up what my cat did
$ gcc fib.c -o fib && ./fib
6
# This one is bad. Hmm...
$ git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[c7fc6b9662376afe035db21bf8072b61f60ba9c8] Let my cat contribute to the codebase
$ gcc fib.c -o fib && ./fib
6
$ git bisect bad
c7fc6b9662376afe035db21bf8072b61f60ba9c8 is the first bad commit
commit c7fc6b9662376afe035db21bf8072b61f60ba9c8
Author: Jonathan Warner <jaxbot@gmail.com>
Date:   Mon Oct 5 21:42:05 2015 -0400

    Let my cat contribute to the codebase

:100644 100644 aa3f6dd016142ff301c6a6379a9075a65b62d0d9 ddb04e09f668c4cbd745495b28241da0cfbd3a83 M	fib.c
```

Curious what was changed? Run `git diff HEAD~1` to see what changed between this commit and the commit before this one.

## Automated bisecting

What if our codebase has an automated test suite? Take a look at `test.c` in the repo. It's not particularly interesting:

```
# test.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
	FILE *fp = popen("gcc fib.c -o fib && ./fib", "r");
	int output;

	fscanf(fp, "%d", &output);

	if (output != 55) {
		printf("Bad!\n");
		return 1;
	}
	printf("Good!\n");
	return 0;
}
```

This program will compile and run foo.c and return 0 (standard success code) if the right result is returned, or 1 otherwise. Non-zero status codes are interpretted as failures on most systems.

Git bisect supports running a command to automatically determine if a commit is bad or good. Try this:

```
# Shorthand for git bisect start, git bisect bad, git checkout HEAD~5, git bisect bad
# aka we know the bad is here and 5 commits away is good
$ git bisect start HEAD HEAD~5
Bisecting: 2 revisions left to test after this (roughly 1 step)
[282adb128c12631e7956329f353a2980eb160bc4] Add useless comments
$ git bisect run ./test
running ./test
Good!
Bisecting: 0 revisions left to test after this (roughly 1 step)
[1ae25e7fd6730b59711a18bfa58e9725e7d3c2a9] Clean up what my cat did
running ./test
Bad!
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[c7fc6b9662376afe035db21bf8072b61f60ba9c8] Let my cat contribute to the codebase
running ./test
Bad!
c7fc6b9662376afe035db21bf8072b61f60ba9c8 is the first bad commit
commit c7fc6b9662376afe035db21bf8072b61f60ba9c8
Author: Jonathan Warner <jaxbot@gmail.com>
Date:   Mon Oct 5 21:42:05 2015 -0400

    Let my cat contribute to the codebase

:100644 100644 aa3f6dd016142ff301c6a6379a9075a65b62d0d9 ddb04e09f668c4cbd745495b28241da0cfbd3a83 M	fib.c
bisect run success
```

Nice! Saved us from having to manually compile, run, check the output, and tell git whether we like the commit or not.

# Aliases

One last quick thing. Git allows you to make aliases to commands you want to run frequently. Here's an example:

```
# This command pushes the current branch to the remote origin and sets the branch to track for subsequent `git push` commands
$ git push origin HEAD -u
# We can alias this to something shorter:
$ git config --global alias.p 'push origin HEAD -u'
# Now we can run `git p` instead of `git push origin HEAD -u`
$ git p
# You can alias any git command for easy access
```

You can alias any git command for easy access. To learn more, [check out this article in the documentation](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases).
