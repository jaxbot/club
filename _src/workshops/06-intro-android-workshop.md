---
title: Intro to Android Workshop
slug: workshops/intro-android-workshop
date: 10/23/2015
template: workshop
author: Ivey Padgett
---

Welcome to the Knight Hacks Intro to Android workshop! We're going to build a simple application for android devices, just to get everyone started on something.

[Github Repo for reference](https://github.com/KnightHacks/intro-android-workshop)

**We are going to rely heavily on Android Studio for this workshop.**

# Starting a Project

Open Android Studio and select **Start a new Android Studio Project**.

<img src="/pics/workshops/android/android_workshop_01.png" alt="Android Studio Splash">

Now you have a configure your project. It will ask about a name, a company domain, and a project location. The company domain is just to create a package name, you can use whatever you want for it.

<img src="/pics/workshops/android/android_workshop_02.png" alt="Configure new Android Studio Project">

Next, it will ask you what type of app you are building and what versions of android should be the minimum. In this case, we are only building a phone and tablet app. You can choose whatever version as your minimum (especially because this is just an example application), but pay attention to the percentages of support.

<img src="/pics/workshops/android/android_workshop_03.png" alt="Target Android Devices Setting">

Now it asks you to choose an activity for your application. I like to think of activities like pages, they are views for your application. We aren't doing anything fancy here, so just choose the **Blank Activity**.

<img src="/pics/workshops/android/android_workshop_04.png" alt="Add an activity setting">

Finally it will ask you to customize your activity. I tend to leave this as the defaults, but if you have a specific plan for that activity (such as a login page for example), then name it as such. You can always rename it or create another activity as well. We won't be creating more than one in this workshop, so it isn't too important.

<img src="/pics/workshops/android/android_workshop_05.png" alt="Customize the activity">

# Making the application

Android studio should drop you off at your main content layout at this point (after some loading). You should see a little android phone and a file structure, along with a bunch of components in a list.

## Initialize git
Before we get started, make sure to initialize a git repository in the project folder (not necessary, but good practice). There is a button in the bottom left labeled **Terminal**, click on that and it should open a terminal. Initialize a git repo in it.


```
$ git init
Initialized empty Git repository in /Users/ivey/www/SimpleApp/.git/
$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        .gitignore
        .idea/
        SimpleApp.iml
        app/
        build.gradle
        gradle.properties
        gradle/
        gradlew
        gradlew.bat
        settings.gradle

nothing added to commit but untracked files present (use "git add" to track)
// I'm going to 'git add .' here, as I checked what was going to be added and am sure I want all of it to be committed.
// Just be careful doing this otherwise.
$ git add .
$ git commit -m "Initial commit"
[master (root-commit) 11a4482] Initial commit
 39 files changed, 760 insertions(+)
```

Everything is added! We can now see exactly what Android Studio does whenever we make a change.

## Adding Components

First, we are going to add a button to the main activity layout.

Go to the **content_main.xml** file and click on the **Design** tab in the lower left. In Android Studio, the file is under **app -> res -> layout**. If you aren't using Android Studio, the file should be in `[project-directory]/app/src/main/res/layout`.

### A Button
Scroll down in the **Palette** window until you see **button** under **Widgets**. Drag and drop it somewhere onto the emulated android phone. 

<img src="/pics/workshops/android/android_workshop_06.png" alt="Adding a button to the design view">

If you switch over to the **Text** tab, you will see what code was added when we dragged that button onto the screen. You can also see these changes with `git diff` in the terminal.

```
<Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="New Button"
        android:id="@+id/button"
        android:layout_centerVertical="true"
        android:layout_centerHorizontal="true" />
```

Let's make the button a little prettier. We can change the text by clicking on the button and editing the **text** of it under the **properties** window on the right side of the **Design** tab. I changed mine to say "Add Item". Let's also change the color and move it to the top-right. Edit **background** to change the background color, I made mine #b2a0f9. You can just move it until it clicks in the top-right.

<img src="/pics/workshops/android/android_workshop_07.png" alt="Move button to top right and change text and background color">

**Code**:
```
<Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="New Button"
        android:id="@+id/button"
        android:background="#b2a0f9"
        android:layout_alignParentTop="true"
        android:layout_alignParentEnd="true" />
```

### Hello World!

Let's move the "Hello World!" text view to the center, and increase the text size to 20pt. You can increase the size by editing **textSize** in the properties window on the design tab.

<img src="/pics/workshops/android/android_workshop_08.png" alt="Move hello world text to the center">

**Code**:
```
<TextView android:text="Hello World!" android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"
        android:layout_centerHorizontal="true"
        android:textSize="20pt" />
```

### A Text Field

Now we can add a text input box next to the button. Grab a **Plain Text** component from under **Text Fields** and drag it to the left of the button. I also extended the length to hit the button and the height to be the same as the button.

<img src="/pics/workshops/android/android_workshop_09.png" alt="Add an input field next to button">

**Code**:
```
<EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText"
        android:layout_alignParentTop="true"
        android:layout_alignParentStart="true"
        android:layout_toStartOf="@+id/button"
        android:layout_alignBottom="@+id/button" />
```

Notice how the text field we added is relative to the button. When the button moves, so does the text field. Also notice that to be relative to the button, the text field references the button's id. Make sure you always change the ids everywhere if you change one.

If you `git diff` at this point, you will see all of the changes we made (plus Android Studio made our content clickable). I committed at this point and said I added a button and an input box and moved the hello world text.

```
$ git diff
diff --git a/app/src/main/res/layout/content_main.xml b/app/src/main/res/layout/content_main.xml
index 07ceb7d..8d69f6d 100644
--- a/app/src/main/res/layout/content_main.xml
+++ b/app/src/main/res/layout/content_main.xml
@@ -10,5 +10,26 @@
     tools:showIn="@layout/activity_main" tools:context=".MainActivity">
 
     <TextView android:text="Hello World!" android:layout_width="wrap_content"
-        android:layout_height="wrap_content" />gi
+        android:layout_height="wrap_content"
+        android:layout_centerVertical="true"
+        android:layout_centerHorizontal="true"
+        android:textSize="20pt" />
+
+    <Button
+        android:layout_width="wrap_content"
+        android:layout_height="wrap_content"
+        android:text="New Button"
+        android:id="@+id/button"
+        android:background="#b2a0f9"
+        android:layout_alignParentTop="true"
+        android:layout_alignParentEnd="true" />
+
+    <EditText
+        android:layout_width="wrap_content"
+        android:layout_height="wrap_content"
+        android:id="@+id/editText"
+        android:layout_alignParentTop="true"
+        android:layout_alignParentStart="true"
+        android:layout_toStartOf="@+id/button"
+        android:layout_alignBottom="@+id/button" />
 </RelativeLayout>
```

Now we have all of the components added!

## Making the Button Do Something

Before we leave the layout file, add an onClick to the button. Click on the button and scroll down the **properties** list until you see **onClick** and type in whatever you want your method to be. I named mine **simple_click**. Android Studio will get mad at you that this method doesn't exist, but we will create it so it's okay.

<img src="/pics/workshops/android/android_workshop_10.png" alt="Add an onClick method to button">

**Code**:
```
<Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="New Button"
        android:id="@+id/button"
        android:background="#b2a0f9"
        android:layout_alignParentTop="true"
        android:layout_alignParentEnd="true"
        android:onClick="simple_click" />
```

We also need to give the "Hello World!" textView an id, here's the code for that:

```
<TextView android:text="Hello World!"
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"
        android:layout_centerHorizontal="true"
        android:textSize="20pt" />
```

### MainActivity.java

Now we need to add this `simple_click` method and make it do something. Edit the MainActivity.java file under **app -> java -> [package name] -> MainActivity**. The file can be found in `[project-directory]/app/src/main/java/[package name]/`.

Somewhere in this file, add the following code:

```
public void simple_click(View view) {
        TextView t = (TextView)findViewById(R.id.textView);
        t.setText("Goodbye!");
}
```
What this does is it finds the `TextView` with the id `textView` and sets the text to "Goodbye!". If you are using Android Studio, it will automatically add an import for TextView for you, otherwise don't forget to add this:

```
import android.widget.TextView;
```

Don't forget to commit! Here's my changes from the last commit (Android Studio did some weird stuff with the misc file):

```
$ git diff
diff --git a/.idea/misc.xml b/.idea/misc.xml
index be75660..6a1e020 100644
--- a/.idea/misc.xml
+++ b/.idea/misc.xml
@@ -1,5 +1,32 @@
 <?xml version="1.0" encoding="UTF-8"?>
 <project version="4">
+  <component name="EntryPointsManager">
+    <entry_points version="2.0" />
+  </component>
+  <component name="NullableNotNullManager">
+    <option name="myDefaultNullable" value="android.support.annotation.Nullable" />
+    <option name="myDefaultNotNull" value="android.support.annotation.NonNull" />
+    <option name="myNullables">
+      <value>
+        <list size="4">
+          <item index="0" class="java.lang.String" itemvalue="org.jetbrains.annotations.Nullable" />
+          <item index="1" class="java.lang.String" itemvalue="javax.annotation.Nullable" />
+          <item index="2" class="java.lang.String" itemvalue="edu.umd.cs.findbugs.annotations.Nullable" />
+          <item index="3" class="java.lang.String" itemvalue="android.support.annotation.Nullable" />
+        </list>
+      </value>
+    </option>
+    <option name="myNotNulls">
+      <value>
+        <list size="4">
+          <item index="0" class="java.lang.String" itemvalue="org.jetbrains.annotations.NotNull" />
+          <item index="1" class="java.lang.String" itemvalue="javax.annotation.Nonnull" />
+          <item index="2" class="java.lang.String" itemvalue="edu.umd.cs.findbugs.annotations.NonNull" />
+          <item index="3" class="java.lang.String" itemvalue="android.support.annotation.NonNull" />
+        </list>
+      </value>
...skipping...
         android:layout_centerVertical="true"
         android:layout_centerHorizontal="true"
@@ -22,7 +24,8 @@
         android:id="@+id/button"
         android:background="#b2a0f9"
         android:layout_alignParentTop="true"
-        android:layout_alignParentEnd="true" />
+        android:layout_alignParentEnd="true"
+        android:onClick="simple_click" />
 
     <EditText
         android:layout_width="wrap_content"

```

### Using the Text Field

Now, the button does something but it doesn't use the input field at all, let's change that!

All we have to do, is have the `simple_click` method check if there is text in the text field, and if so, replace the textView text with that.

To do this, we have to grab the text from the editText, convert it to a string (because it isn't already for some odd reason), and check if it matches the empty string.

**Code**:
```
public void simple_click(View view) {
        EditText e = (EditText) findViewById(R.id.editText);
        TextView t = (TextView) findViewById(R.id.textView);
        if (e.getText().toString().matches("")) {
            t.setText("Goodbye!");
        } else {
            t.setText(e.getText().toString());
        }
    }
```

Don't forget to add an import for EditText!

```
import android.widget.EditText;
```

Here's my `git diff`:

```
$ git diff                                                                        
diff --git a/.idea/misc.xml b/.idea/misc.xml
index be75660..6a1e020 100644
--- a/.idea/misc.xml
+++ b/.idea/misc.xml
@@ -1,5 +1,32 @@
 <?xml version="1.0" encoding="UTF-8"?>
 <project version="4">
+  <component name="EntryPointsManager">
+    <entry_points version="2.0" />
+  </component>
+  <component name="NullableNotNullManager">
+    <option name="myDefaultNullable" value="android.support.annotation.Nullable" />
...skipping...
         android:layout_centerVertical="true"
         android:layout_centerHorizontal="true"
@@ -22,7 +24,8 @@
         android:id="@+id/button"
         android:background="#b2a0f9"
         android:layout_alignParentTop="true"
-        android:layout_alignParentEnd="true" />
+        android:layout_alignParentEnd="true"
+        android:onClick="simple_click" />
 
     <EditText
         android:layout_width="wrap_content"
```

And that's it! There are a ton of resources online to go further, and this is only the beginning. Good luck!
