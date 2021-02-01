# Tree-make

This is a simple program that helps display the contents of a directory using unordered lists in html. See instructions of use below.

## Introduction

This is a simple javascript file called make.js, that creates a (nested)ul of a tags that link to the files in a particular directory(attribute dir in the div with id "tree") and then insersts the main UL into div with the id "tree" in the template.html file subsequently creating an output file index.html.

## Instructions for use(not dev)

Run the following command to setup the cli:

```bash
git clone https://github.com/jujhaar2409/tree-make.git ./tree-make && cd tree-make && npm install && npm link
```

Now, you simply have to go to any directory where you have a folder(for example tree), the contents of which you want to display in an html page.

You should create a `template.html` that looks something like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Hello</h1>
    <div id="tree" dir="./tree" base="."></div>
  </body>
</html>
```

Finally, you simply run in your terminal:

```bash
tree-make
```

It should generate a file called index.html, which contains a ul with the structure of the specified directly!

## Unlinking

```bash
npm unlink && sudo npm rm --global tree-make && npm ls --global tree-make
```
