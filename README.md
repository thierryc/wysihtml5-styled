Wysihtml5-styled Predictive 0.6.0a
==================================

Wysihtml5 is an open source rich text editor based on HTML5 technology
and the progressive-enhancement approach.  
It uses a sophisticated security concept and aims to generate fully
valid HTML5 markup by preventing unmaintainable tag soups and inline
styles.

The code is (not**) completely library agnostic: No jQuery, Prototype or
similar is required.
  
**Modal require jQuery and Bootstrap.**

Todo : add soft dependences to bootstrap.  
This project use twitter boostrap.

**This project was initiated and is supported by the** [XING
AG](https://www.xing.com*). Thanks!

  
## Features
  
### 0.6.0a

* Fullscreen

### 0.5.0Pre   

  * Auto linking of urls as-you-type  
  * Generates valid and semantic HTML5 markup (no <code><font></code>)  
  * Uses class-names instead of inline styles  
  * Unifies line-break handling across browsers (hitting enter will create br instead of code)  
  * Auto-parses content inserted via copy & paste (from Word, Powerpoint,
PDF, other web pages, …)  
  * Converts invalid or unknown html tags into valid/similar tags  
  * Source code view for users with HTML skills  
  * Uses sandboxed iframes in order to prevent identity theft through
XSS  
  * Editor inherits styles and attributes (placeholder, autofocus, …)
from original textarea (you only have to style one element)  
  * Speech-input for Chrome

Roadmap
-------

### 0.6.1a   
  * Table

### 0.6.1b  
  * Soft dependences to bootstrap.

Browser Support
---------------

The rich text editing interface is supported in IE8*, FF 3.5*, Safari
4*, Safari on iOS 5*, Opera 11+ and Chrome.  
**Graceful Degradation:** Users with other browsers will see the
textarea and are still able to write plain HTML by themselves.

Demos
-----

-   [Simple Editor with italic and bold
    buttons](http://thierryc.github.com/wysihtml5/examples/simple.html)
-   [Editor with advanced
    functionality](http://thierryc.github.com/wysihtml5/examples/advanced-styled.html)

Companies using wysihtml5 (original)
------------------------------------

-   [Basecamp](http://basecamp.com) - Leading web-based project
    management and collaboration tool
-   [XING](https://www.xing.com) - Business Social Network with more
    than 12 million members
-   [Qype](http://www.qype.com) - Largest user-generated local review
    site in Europe
-   and many more …

Companies using wysihtml5 (styled)
----------------------------------

-   [Pikock](http://Pikock.com) - Pikock web site
-   [Autre Planete](https://www.autreplanete.com.com) - Graphic and
    Interactive User Interfaces Design Studio
-   and many more I hope ;-)…

Wiki
----

Check our [Wiki Pages](https://github.com/xing/wysihtml5/wiki) including
a simple [Getting Started
Tutorial](https://github.com/xing/wysihtml5/wiki/Getting-Started).

Research
--------

Before starting wysihtml5 we spent a lot of time investigating the
different browsers and their behaviors.

Check this repository:  
[https://github.com/tiff/wysihtml5-tests](https://github.com/tiff/wysihtml5-tests)

A compatibility table for rich text query commands can be found here:  
[http://tifftiff.de/contenteditable/compliance  _test.html](http://tifftiff.de/contenteditable/compliance_test.html)

A pure native rich text editor with HTML validator and live source
preview is here:  
[http://tifftiff.de/contenteditable/editor.html](http://tifftiff.de/contenteditable/editor.html)

Contributors wysihtml5 (original)
---------------------------------

- [@tiff](http://tifftiff.de/contenteditable/editor.html)
- [@ingochao](https://github.com/ingochao)
- [@uwe](https://github.com/uwe )


Contributors Table (original)
-----------------------------

- [@Edicy](https://github.com/Edicy)

Contributors wysihtml5 (styled)
-------------------------------
- [@thierryc](https://github.com/thierryc)
- [@pikock](https://github.com/pikock)
