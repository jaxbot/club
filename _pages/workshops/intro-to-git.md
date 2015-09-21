# Getting Started

**NOTE**: If you are using Windows, use [GitBash](https://git-scm.com/download/win) for all the following commands.

**Another Note**: If you aren't familiar with command line tools, glance over our [Command Line Workshop](https://github.com/KnightHacks/club/blob/master/_pages/workshops/intro-to-command-line-linux-and-windows.md).

Go to the home directory (~) and make and go into a Knight Hacks Directory (skip if you already have one). Make a `git-example` directory and go into it. Then create a hello.txt file and edit it with whatever editor you choose, add something to the file.

```
$ cd ~
$ mkdir knighthacks
$ cd knighthacks
$ mkdir git-example
$ cd git-example

// Touch creates an empty file.
$ touch hello.txt
```
My `hello.txt`:
```
Hi! I am Ivey.
```
Now it is time to get started with git! We are going to "initialize" it inside of the directory, which tells git we want to keep track of this directory with git.
```
$ git init

Initialized empty git repository in <YOUR-DIRECTORY>/knighthacks/git-example/.git/
```
Now to give a bit of a breakdown of what happens once you initialize. It creates some hidden `.git`  files/directories which contains the information making the directory a git repository. **IMPORTANT**: If you delete this, you lose all of your git history!

We will check the `status` of the directory, which will tell you which files are "tracked" and "untracked" along with which files have changes made to them. It also gives you more information but we will get to that soon.

So running `git status` at this point should tell you that `hello.txt` is an `untracked file`. This means that git is not keeping track of changes made to this file, we want it to keep track.
```
$ git status

On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	hello.txt

nothing added to commit but untracked files present (use "git add" to track)
```
Now we want to tell it to actually keep track of `hello.txt`, so we `add` it to git.

After adding it, checking the status should show hello.txt under a `Changes staged for commit` message. This means that when you write a commit message (description), this file will be included in the files under that message.

```
$ git add hello.txt
$ git status

On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   hello.txt
```
Now, we want to `commit` this change, or make it set in stone. We also want to describe what we did with this change.

**NOTE**: If you have never committed on this machine git will ask you to fill out some basic information about yourself (name and email). It will give you the commands to run, so just follow them!

**Side Note**: If you `git commit` without the `-m`, it will open a visual commit message editor. This will probably be VIM and to add and save your commit message follow these steps:
* Press `i` to go into insert mode, then type out your commit message.
* Press `esc` to leave insert mode once you finish.
* Type in `:wq` to write (save) and then quit.
* All done! You used vim and saved a commit message :D

```
// Normally, the first commit is described as the “initial commit”
$ git commit -m “Initial Commit”

[master (root-commit) 7f482f8] Initial commit
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 hello.txt
```
Now that it is commited, when you check the status there should be nothing there.
```
$ git status

On branch master
nothing to commit, working directory clean
```
Now check the logs! You should see your “initial commit” message as the only thing there.
```
$ git log

commit 7f482f82a51c43c2f874ec7719f67f43acc55239
Author: USER <EMAIL>
Date:   Thu Sep 17 18:34:01 2015 -0400

    Initial commit
```
Edit `hello.txt` again, make some change and save it.

My changed `hello.txt`:
```
Hi! I am Ivey. I am a member of Knight Hacks!
```
Checking the status now should show hello.txt under `Changes not staged for commit`. This means that there have been changes on this file, but when you commit, that file will not be included in the list of changes. The easiest way to describe this is if you make changes to a lot of files but only want to commit a few of the files, the ones not staged for commit will not be included. An example of this would be if you are working on a few files but only want to commit what is finished, you would add those files and not the unfinished ones.
```
$ git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   hello.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
Now let’s `diff` it! This is checking to see what changes were made between the last commit and now. You should see the changes you made reflected in green if you added anything and red if you deleted anything.

**Side Note**: If your changes are longer than the terminal window, you will be able to scroll through them using vim commands. You can use the arrows keys, `j` and `k`, or enter to scroll through them. To exit, you just have to hit the `q` key.
```
$ git diff

diff --git a/hello.txt b/hello.txt
index d72672e..ebd4b4c 100644
--- a/hello.txt
+++ b/hello.txt
@@ -1 +1 @@
-Hi! I am Ivey.
+Hi! I am Ivey. I am a member of Knight Hacks!
```
Let’s add hello.txt to be commited. Add a message that reflects the changes you made. The following message is just an example of something you could have done and then described.
```
$ git add hello.txt
$ git commit -m “Added my Knight Hacks membership status.”

[master 013aaf4] Added my Knight Hacks membership status.
 1 file changed, 1 insertion(+), 1 deletion(-)
```

# Branching and Merging

Before we move onto editing a remote repository, let's learn how to branch and merge changes.

Branching is so that you can make all of your changes, make sure they work, and then merge the main branch back into it to make sure your changes keep up to date with any changes anyone else made. An example of this is if you want to test out some change you want to make but don't want to affect anyone else's code or the main code base.

Let’s branch off of the master branch to make some changes.

`git branch` shows you what branches you have and what branch you are on. the `* master` means we are currently on the master branch.
```
$ git branch

* master
```
To make a new branch, use `git branch <BRANCH_NAME>`.
```
$ git branch new-changes
$ git branch

* master
  new-changes
```
To switch to that branch, use `git checkout <BRANCH_NAME>`. Checking the branches at this point will show the `*` on `new-changes` to reflect switching to that branch.
```
$ git checkout new-changes
$ git branch

  master
* new-changes
```
Making a change on the `new-changes` branch will put the `new-changes` branch ahead of master. Let's make a change to `hello.txt` to make this the case.
```
// Make some change to hello.txt
$ vi hello.txt
$ git status

On branch new-changes
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   hello.txt

no changes added to commit (use "git add" and/or "git commit -a")

$ git add hello.txt
$ git commit -m 'Added my school year to hello.txt'

[new-changes 3eeeb16] Added my school year to hello.txt
 1 file changed, 1 insertion(+)
```
Now `new-changes` is ahead of `master` by one commit. If you switch back to master and look at `hello.txt` you will not see the changes  you just made in `hello.txt`.

Now that we have made a change and are happy with it, let's merge it back into `master` to acknowledge our change is permanent.
```
// Make sure you are on the 'master' branch first!
$ git checkout master
$ git merge new-changes

Updating 013aaf4..3eeeb16
Fast-forward
 hello.txt | 1 +
 1 file changed, 1 insertion(+)
```

Now that you know how to branch and merge, let's move onto editing a remote repository!

# Editing a Remote Repository

Now we want to `pull` down someone’s code and make changes to them.

You should still be in the `knighthacks/git-example` directory, let’s step back into `knighthacks/` and `clone` a git repository into it.

Repository: https://github.com/KnightHacks/git-workshop.git

Cloning copies all files from a git repository and puts it into your local folder.
```
// Let's go back into the 'knighthacks/' directory first.
$ cd ../
// You should be in 'knighthacks/' now! If you aren't, find you way back.
$ git clone https://github.com/KnightHacks/git-workshop.git
```
Now, to explain a bit. There are currently two repositories of this workshop repo. There is your “local” repository, which is your copy. And there is the “remote” repository, which is the one stored on Github.

Let's dive into the repository we just cloned!
```
$ cd git-workshop
```
Git logging at this point will show you changes made by the Knight Hacks members. Now let’s make a change!

Before we make any changes, we should branch to a new branch. I am going to call my branch `add-message` to reflect the change I am going to make, but you can call yours whatever you like.
```
$ git branch add-message
$ git checkout add-message
```

Edit `hello.txt` with whatever file editor you choose, I’ll be using vim. Make some change, like changing the name to be your name, and then commit it.
```
$ git status

On branch add-message
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   hello.txt

no changes added to commit (use "git add" and/or "git commit -a")

$ git diff

diff --git a/hello.txt b/hello.txt
index dc0f03d..404c9ab 100644
--- a/hello.txt
+++ b/hello.txt
@@ -1,2 +1,3 @@
 Hello! My name is Ivey.
 I am a third year student at the University of Central Florida.
+I love git!

$ git add hello.txt
$ git commit -m “Added a message about loving git”

[add-message 6a9a170] Added a message about loving git
 1 file changed, 1 insertion(+)
```
Now you have made changes to a remote repository! Next we will talk about pushing your changes to the repository.

# Pushing to a Remote Repository

In most cases, when you want to push to a repository, you are going to want to `branch` from the repository, make your changes, and either merge into master or push the branch and make a pull request (a Github concept). We will be showing how to push a branch in this example.

Let’s make a branch called `<github-username>-changes`.
* `git branch <BRANCH_NAME>` creates a branch with `<BRANCH_NAME>`.
* `get checkout <BRANCH_NAME>` switches you onto the the `<BRANCH_NAME>` branch.

You should still be in `knighthacks/git-workshop`

**USE YOUR GITHUB USERNAME AND NOT "IVEYSAUR"**
```
// Make sure we're on master
$ git checkout master
// Create a branch called <USERNAME>-changes
$ git branch iveysaur-changes
$ git branch

  iveysaur-changes
* master

// Switch onto the <USERNAME>-changes branch
$ git checkout iveysaur-changes

Switched to branch 'iveysaur-changes'

// You can see that we are now on the <USERNAME>-changes branch.
$ git branch

* iveysaur-changes
  master
```
Make some change to `hello.txt`, check your changes and commit them.
```
// You don't have to use VI, I am putting it here as an example.
$ vi hello.txt
$ git status

On branch iveysaur-changes
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   hello.txt

no changes added to commit (use "git add" and/or "git commit -a")

// This time I removed something, it will be denoted with a -
$ git diff

diff --git a/hello.txt b/hello.txt
index dc0f03d..f87e468 100644
--- a/hello.txt
+++ b/hello.txt
@@ -1,2 +1 @@
 Hello! My name is Ivey.
-I am a third year student at the University of Central Florida.

$ git add hello.txt
$ git commit -m “Removed my school year”

[iveysaur-changes 8c0060b] Removed my school year
 1 file changed, 1 deletion(-)
```
Now, we need to `pull` in any changes from master. In this case, the Knight Hacks team made some changes to master so you will see there were changes made.

Note: the `origin master` part of the command is telling git what repository (`origin`) and what branch (`master`) to pull from.
```
$ git pull origin master

From github.com:KnightHacks/git-workshop
 * branch            master     -> FETCH_HEAD
Auto-merging hello.txt
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```
Oh no! There is a `merge conflict`. Luckily it should be pretty simple to fix. To deal with this, you have to open the conflicted file (`hello.txt` in my case) with a text editor.

Here's what it looks like:
```
<<<<<<< HEAD
Hello! My name is Ivey.
=======
Hello! My name is Jonathan.
I am a third year student at the University of Central Florida.
>>>>>>> 73cfd815f4568729088343ab3b6a937507e3f4ad
```
Time to break this down.
* Everything between `<<<<<<< HEAD` and `=======` are your changes.
* Everything between `=======` and `>>>>>>> 73cfd815f4568729088343ab3b6a937507e3f4ad` are someone else's changes.

Basically, you have to decide which changes to keep, or how to correctly `merge` the two together. In my case, I am going to try to salvage both our information. Edit the file to remove all of the dividers, and decide how you end up wanting the file to look.

Here's my final version:
```
Hello! Our names are Ivey and Jonathan.
We are third year students at the University of Central Florida.
```

After saving, you should be able to add the updated file and commit it.
```
$ git status

On branch iveysaur-changes
You have unmerged paths.
  (fix conflicts and run "git commit")

Unmerged paths:
  (use "git add <file>..." to mark resolution)

	both modified:   hello.txt

no changes added to commit (use "git add" and/or "git commit -a")

$ git add hello.txt

// Git commit without the -m will bring up a terminal text editor (probably VI but it may vary for everyone).
// It should automatically fill in the text for you though, so you should just be able to save and exit.
// In VI you do this by typing :x
$ git commit

[iveysaur-changes 3ae9459] Merge branch 'master' of github.com:KnightHacks/git-workshop into iveysaur-changes
```

Finally, we can push to a branch on the remote repository, to the same branch we made here.

**USE YOUR GITHUB USERNAME AND NOT "IVEYSAUR"**
```
$ git push origin iveysaur-changes
# Note: You will be prompted for a username and password when you push
# During the workshop, we had people push to our public repo using
# certain credientials. If you are following along after the fact,
# please fork the main repository and push to your fork instead
# You can change the remote by doing:
$ git remote remove origin
$ git remote add origin <whatever shows up in the clone URL box>
```

And you are done! If you have questions please reach out to us. Also, keep an eye on your branch, we may make changes to them and have you pull our changes ;)

# Tips

* `git commit -a`
  * This replaces `git add` + `git commit`.
  * It commits all files in the `changes not staged for commit` area. 
  * This does **not** commit any untracked files.
  * Be careful with this as it can lead to committing something you didn't mean to!
* `git checkout -b <SOME_BRANCH>`
  * This replaces `git branch <SOME_BRANCH>` + `git checkout <SOME_BRANCH>`.
  * Just a handy shortcut to create and switch to a branch!
* **NEVER** commit any passwords.
  * Once you commit something (and especially push it somewhere) it is there for good!
  * You don't want to commit any passwords or secret keys, because then everyone knows them!
* **ALWAYS** `git status` and `git diff`.
  * Moral of the story is to be certain of what you commit before you commit it. 
  * It saves a lot of time and stress to check your changes before you commit them.
* If you get stuck there is probably a stack overflow question that answers your issue, just google it!

# More Resources

* [Github git tutorial](https://try.github.io/levels/1/challenges/1)
* [Learn Git Branching](http://pcottle.github.io/learnGitBranching/)
