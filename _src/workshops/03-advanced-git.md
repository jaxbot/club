---
title: Advanced Git Workshop
slug: workshops/advanced-git-workshop
date: 10/09/2015
template: workshop
---

Welcome to the Knight Hacks Advanced Git workshop! We're going to build on top of the previous [git workshop](http://knighthacks.club/git) and teach some more advanced skills.

Start by opening Terminal (OSX/Linux) or GitBash (Windows). Any command you type should be followed by the `enter` key to execute that command in the shell.

# Getting started

Most of the work in this section will be done on the KnightHacks club website repo, since it's full of random stuff. Pull down a copy of it:

```
$ git clone https://github.com/KnightHacks/club.git
Cloning into 'club'...
remote: Counting objects: 693, done.
remote: Total 693 (delta 0), reused 0 (delta 0), pack-reused 693
Receiving objects: 100% (693/693), 1.97 MiB | 1.33 MiB/s, done.
Resolving deltas: 100% (318/318), done.
Checking connectivity... done.
$ cd club
```

# Partial commits

Let's say you made a few changes but want to split up your commit, since some of the changes aren't related to the others.

Start by editing some stuff in the club repo:

```
# Open up package.json. You can use Vim or whatever other text editor you like
$ vim package.json
# Change the description key to "KnightHacks.club Website"
# Further down in the file, delete the line that starts with "scripts"
```

At this point we've made two unrelated changes to this file. We could commit it all as is, but instead we're going to do it in two separate commits to keep things clean:

```
$ git commit -p
diff --git a/package.json b/package.json
index eed9198..6274b38 100644
--- a/package.json
+++ b/package.json
@@ -2,7 +2,7 @@
   "name": "knight-hacks",
   "private": true,
   "version": "0.0.0",
-  "description": "KnightHacks.org Website",
+  "description": "KnightHacks.club Website",
   "dependencies": {},
   "devDependencies": {
     "del": "^1.2.0",
Stage this hunk [y,n,q,a,d,/,j,J,g,e,?]?

# Type y and press enter.
@@ -46,5 +46,4 @@
   "engines": {
     "node": ">0.10.0"
   },
-  "scripts": {}
 }
Stage this hunk [y,n,q,a,d,/,K,g,e,?]?
# Type n and press enter
```

At this point Vim (or whatever your default commit editor is) will open. Take note of the commit comments:

```
# Changes to be committed:
#       modified:   package.json
#
# Changes not staged for commit:
#       modified:   package.json
```

Interesting. We have changes in package.json that are staged to be committed, as well as changes that are *not* staged for commit.

Go ahead and fill out the commit message and commit as normal. I used the message "Update package description". Now let's check what state we're in:

```
$ git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   package.json

no changes added to commit (use "git add" and/or "git commit -a")
```

As shown in the `git status` output, we still have uncommitted changes in package.json. In this case we committed the first change we made, but not the deletion of "scripts". Let's go ahead and commit it now. We don't need to use the partial commit command this time since we want to commit all the remaining hunks.

```
$ git add package.json
$ git commit -m "Remove unneeded scripts definition"
```

Cool! Now we have our changes split into two commits.

# Stashing

Sometimes we'll do work that puts the working directory in a dirty, or changed state, and suddenly need to pull or switch branches. We can't do this if the new state would overwrite our changes, because git won't merge uncommitted files. In that case, we need to use `git stash`.

Let's simulate this. We want to add an event to the KH club site, so we start editing the config file:

```
$ vim _data/config.yml
# Change something in here, it doesn't matter
# I added this before the hackathon lines:
    -
      name: Big party
      date: 01/15/16
```

Save and exit the file. Now try to switch branches:

```
$ git checkout origin/updates/remove-social
error: Your local changes to the following files would be overwritten by checkout:
	_data/config.yml
Please, commit your changes or stash them before you can switch branches.
Aborting
```

Bam, blocked. Before we can do that, we need to `stash` our changes into a stack.

```
$ git stash
```

Now notice that all of our changes in the working directory are seamingly gone. This is what we wanted, since we're now able to switch branches.

```
$ git checkout origin/updates/remove-social
# Works!
```

Now how do we get our precious changes back? Just `git stash apply`:


```
# Go where we want to apply the changes. We could theoretically apply them to origin/updates/remove-social if we wanted to
$ git checkout master
$ git stash apply
```

Now the working directory is back in the state we want it. Nice.

# Rebasing

Rebasing is useful for rebuilding history. It can often be used as a replacement for merging:

```
$ git checkout patch-readme
$ git rebase master
First, rewinding head to replay your work on top of it...
Fast-forwarded patch-readme to master.
$ git checkout master
```

Instead of merging, we've rebuilt the history to incorporate the new commits. This particular workshop won't go deep into the details of rebasing vs. merging, but if you're curious, <a href="https://www.atlassian.com/git/tutorials/merging-vs-rebasing" target="_blank">add this to your reading list</a>.

## Interactive rebasing

The part we *are* interested in right now is the ability to rebase the history of the repo to our liking. This allows us to combine commits, delete commits and put commits in a different order.

This is all achieved using `git rebase -i`.

Here's an interactive (no pun intended) example: The club website has a lot of garbage commits that we don't need in it. Let's get rid of them.

```
# git rebase requires us to pass it a reference of what we're rebasing against
# Let's go back 10 commits
$ git rebase -i HEAD~10
```

At this point, you've probably been dropped into Vim with a list of commits. Git will run through this list and rebuild history based off it. It's important to note that these execute from top to bottom. Here's what it looks like for me:

```
pick 0ade98c Relevant issue: #
pick 5519b8b Relevant issue: #
pick 85f83c2 Relevant issue: #100
pick 809c968 Add Google events
pick b8dd999 Allow events to be links
pick 08754e5 Add the link to the internship social
pick 9fdd187 Fix broken links on the workshop page
pick 96df308 Remove unnecessary tmp files
pick 369e61e Remove internship social from the events list
pick d5295b3 Add link to the advanced git workshop
pick 238cca9 Update package description
pick 5a7ba10 Removed unneeded script block

# Rebase e4b89dd..5a7ba10 onto e4b89dd
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

Let's start by getting rid of the commits we don't want. All the commits with "Relevant issue" aren't important and can be deleted. Delete those lines from the file. In Vim, you can use the arrow keys or `j` and `k` to move be cursor over the line, then press `dd` to delete the line.

It should now look like:

```
pick 809c968 Add Google events
pick b8dd999 Allow events to be links
pick 08754e5 Add the link to the internship social
pick 9fdd187 Fix broken links on the workshop page
pick 96df308 Remove unnecessary tmp files
pick 369e61e Remove internship social from the events list
pick d5295b3 Add link to the advanced git workshop
pick 238cca9 Update package description
pick 5a7ba10 Removed unneeded script block
```

Cool. Now let's combine those last two commits that we worked so hard earlier to split into two. Do this by changing the last "pick" to "s":

```
pick 809c968 Add Google events
pick b8dd999 Allow events to be links
pick 08754e5 Add the link to the internship social
pick 9fdd187 Fix broken links on the workshop page
pick 96df308 Remove unnecessary tmp files
pick 369e61e Remove internship social from the events list
pick d5295b3 Add link to the advanced git workshop
pick 238cca9 Update package description
s 5a7ba10 Removed unneeded script block
```

Save and exit the file. `:wq` to save and exit in Vim.

```
The previous cherry-pick is now empty, possibly due to conflict resolution.
If you wish to commit it anyway, use:

    git commit --allow-empty

Otherwise, please use 'git reset'
rebase in progress; onto e4b89dd
You are currently rebasing branch 'master' on 'e4b89dd'.

nothing to commit, working directory clean
Could not apply 96df3087071afb3ce26235f6cb9337b8025f68bd... Remove unnecessary tmp files
```

Awh great. A wild problem showed up. This is okay; sometimes when rebasing, merge conflicts or other hangups will occur. Git has paused the process for us and is awaiting further instructions. In this case, the `Remove unnecessary tmp files` commit is a useless no-op, because we got rid of the commits that created the mess it wanted to clean up. We can resolve this one by doing:

```
$ git reset
$ git rebase --continue
```

At this point we should be dropped into Vim again. Git has given use the commit messages of the commits we are combining and wants us to write a new commit message for the single commit we're creating:

```
# This is a combination of 2 commits.
# The first commit's message is:

Update package description

# This is the 2nd commit message:

Removed unneeded script block

```

Edit this as you please. I changed the entire text to be:

```
Update package description and remove unneeded script block
```

`:wq`.

```
[detached HEAD ab878bc] Update package description and remove unneeded script block
 Date: Wed Oct 7 21:19:51 2015 -0400
 1 file changed, 1 insertion(+), 2 deletions(-)
Successfully rebased and updated refs/heads/master.
```

Awesome! We've successfully modified the history. Take a look at it with `git log` and notice that we've totally changed the list of commits as compared to it previously.

## Can we push this?

<img src="/pics/gitpushforce.jpg" alt="A girl looking at a house on fire with a michevious look on her face and the caption 'Push rejected, rebase or merge. git push --force'">

That depends. The general rule is not to edit public history. If you've already pushed the changes that you rebased and you try to push, git will reject your changes since they do not match the history on the server. You can force your version of history to overwrite the version on the server, but this can screw over anyone else who is working on the project and cause them to lose commits. Only do this if you're sure you want your copy of the code to completely steamroll any other copy of it.

## Undoing a rebase

What if we decide we didn't really want to rebase? We can't just checkout HEAD~1 because we just rewrote all of history.

Thankfully, git has a helpful tool called `reflog`. That's "ref log", not "re-flog". As the name suggests, this tool will give us a log of all the references we've interacted with.

```
$ git reflog 
ab878bc HEAD@{0}: rebase -i (finish): returning to refs/heads/master
ab878bc HEAD@{1}: rebase -i (squash): Update package description and remove unneeded script block
e745060 HEAD@{2}: rebase -i (pick): Update package description
bcfbf7e HEAD@{3}: rebase -i (pick): Add link to the advanced git workshop
9c552c3 HEAD@{4}: rebase -i (pick): Remove internship social from the events list
3145975 HEAD@{5}: rebase -i (pick): Fix broken links on the workshop page
4e1a016 HEAD@{6}: rebase -i (pick): Add the link to the internship social
0cbc287 HEAD@{7}: rebase -i (pick): Allow events to be links
3f1b3c1 HEAD@{8}: rebase -i (pick): Add Google events
e4b89dd HEAD@{9}: rebase -i (start): checkout HEAD~10
5a7ba10 HEAD@{10}: rebase: checkout master
```

Let's go back to where we were before the rebase began by resetting to the commit hash listed for when we checked out master

```
$ git reset --hard 5a7ba10
```

Boom. Now check `git log` and notice we're back to where we were before we rebased.

# Bisecting

Ever found yourself with broken code and wanted to isolate where the problem came from? Bisecting preforms a binary search to help introduce what commit caused a bug.

We'll be using a different repo to experiment with this, so clone this and go to its working directory:

```
$ git clone https://github.com/KnightHacks/bisect-example.git
$ cd bisect-example
```

Cool! So here's the context. We have a program in this repo that is supposed to print out the Fibonacci number for 10. The expected output is 55, but we've started to see the program spit out different output lately. Let's try to figure out which commit went wrong with `git bisect`

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

# Now we're on a different commit. Let's see if it's any good.
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

Bam! Found the commit where things first started breaking. This took a couple of steps, but imagine if we had 100 commits and needed to find the bad one. We could do it in approximately 7 steps instead of having to check each one individually. Pretty cool.

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
# Compile our test runner
$ gcc test.c -o test

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

# Hooks

What if we wanted to be sure nobody ever committed bad code?

Hooks allow us to have code executed at before and after different events in git, and have git take action or abort actions depending on their output.

In this case, we're going to use a pre-commit hook to stop committing if the tests do not pass. If you browse .git/hooks, you'll find tons of samples to get a good idea of what you can use hooks for.

Copy these contents into `.git/hooks/pre-commit`

```
#!/bin/bash
# We want to test what is currently staged, so stash any stages
# in the working directroy
git stash -q --keep-index
gcc test.c -o test && ./test
RESULT=$?
# Put the working directory back to the way it was
git stash pop -q
if [ $RESULT -ne 0 ]; then
	echo "Cowardly refusing to commit because the tests are not passing."
	exit 1
fi
exit 0
```

Now make that file runnable:

```
$ chmod +x .git/hooks/pre-commit
```

Cool! Now modify fib.c into a stage where the tests won't pass (i.e. change fib-1 to fib-5) and try to commit:

```
$ git add fib.c
$ git commit
Bad!
Cowardly refusing to commit because the tests are not passing.
```

Perfect! We've blocked the bad code from being checked in. But what if, idk, we really wanted to get our code in, even if tests failed? Try --no-verify

```
$ git commit --no-verify
# Yay, we can commit!
```

As said above, there are tons of uses for git hooks. Try reading the samples in .git/hooks for ideas.

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
