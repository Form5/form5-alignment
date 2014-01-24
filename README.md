form5-alignment
===============

form5-alignment is a collection of alignment helper functions dependent on jQuery. Only **3KB** of minified Javascript.

[Demo](http://form5.github.io/form5-alignment/)

### How to fetch form5-alignment?

Install with [Bower](http://bower.io): `bower install form5-alignment`

Clone the Github project: `git clone https://github.com/Form5/form5-alignment.git`

Or [download zip](https://github.com/Form5/form5-alignment/archive/master.zip).

### Then what?

**Please note** that this is a very rough documentation, so until we
complete it we encourage you to check out the source code and the
[demo](http://form5.github.io/form5-alignment/).

### Getting started

After installation simply load the file along with other scripts, no further
initialization is necessary. Remember that this script requires jQuery,
meaning jQuery should already be loaded before this script. We recommend using
the latest stable release.

```html
<script src="path/to/jquery.js"></script>
<script src="path/to/form5-alignment.min.js"></script>
```

Attach the appropriate attribute to an element the function should be applied
to, like so e.g.

```html
<div vertical-center>...</div>
```

All options (as of v1.0) only take integers as a value, and are of course optional. Desired options should be included within the attribute as [JSON](http://en.wikipedia.org/wiki/JSON), like so e.g.

```html
<div vertical-center="{above: 568, below: 1023}">...</div>
```

`above and `below` reference the window's width, meaning it should work above
and/or below a width predefined by yourself. (try out the
[demo](http://form5.github.io/form5-alignment/))

### Available functions

---

#### [full-window-height]

```html
<div full-window-height>...</div>
```

Will set the min-height of the element to window.height(). The value can be
proportionally modified by the multiply option, e.g. `multiply: 0.5` will
return half of the window.height().

Available options: `{above: integer, below: integer, multiply: integer}`

---

#### Equalize

This function will go through all `[equalize]` elements within
`[equalize-wrap]`, find the largest one, and set it as a fixed height on all
of the elements in this group.

#### [equalize-wrap]

```html
<div equalize-wrap>...</div>
```

Available options: `{above: integer, below: integer}`

Should be applied to, well, the wrap element. This is required to allow
multiple sets of 'equalized' elements on same page.

#### [equalize]

```html
<div equalize>...</div>
```

Should be applied to all elements, within the previously mentioned
equalize-wrap, this function should affect.

---


#### [vertical-center]

```html
<div vertical-center>...</div>
```

Will center the element vertically within it's parent.

Available options: `{above: integer, below: integer}`

---

### What about debugging?

For debugging you can run this _after_ the functions have been included.

```javascript
window.form5.alignment.debug = true;
```

This will return each element affected by these functions and all options related to each one.

### Want more?

You could go all in and customize the script directly. The original can be
found in `src/form5-alignment.js`. To compile a minified/uglified version of
your new script you can build it again by running:

```shell
$ npm install
$ grunt build
```

If you would like to extend the core functionality of this script in a way
that could benefit others, don't hesitate to create a pull request!

### Author

Written by [Form5](http://www.form5.is).

### Contributors

[Benedikt D Valdez](http://github.com/benediktvaldez), developer at
[Form5](http://www.form5.is).

[Olafur Nielsen](http://twitter.com/olafurnielsen), co-founder at
[Form5](http://www.form5.is).

[Arni Reynir Oskarsson](http://github.com/arnireynir), developer at
[Form5](http://www.form5.is).
