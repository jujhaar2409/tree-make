# Tree-make

This is a simple javascript file called make.js, that creates a (nested)ul of a tags that link to the files in a particular directory(attribute dir in the div with id "tree") and then insersts the main UL into div with the id "tree" in the template.html file subsequently creating an output file index.html.

a sample template.html file could look like this:

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
