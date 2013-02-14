Unobtrusive Alert (unAlert)
===========================
**A plugin to make any of your dom elements displays has an unobtrusive alert**

Do you throw an alert everytime you want to display an message to your user? *Really?????*

Well, you should NOT do that.

Mostly becasuse is an awfoul usability pratice, and on the top because the user is really annoyed by this so called "feature". 
Many usability gurus already stressed this subject, but the best guideline I found it is from XXX

Motivations
-----------

There is some plugins that do the same, like [jGrow](http://www.stanlemon.net/projects/jgrowl.html), but i really belive that no plugin should make any assumption of the design, because is the designers responsability to decide the best way to show an message, that fits in yours site needs.

The idea of this plugin is very close to the implementation of the lightbox itself, but again it won't be depend on the heavy css and html configuration, it is a framework/plugin responsability to help you to get the job done and be as flexibles as it can be.

So this plugins objectives are:

*   Be HTML / CSS / Image abstract
*   Help to detach and present the alert(s)
*   Make-it easy to control inside a jQuery selector


Usage
-----

Just call the unalert function on the selector you want to display has a unobtrusive alert:
  

Documentation
-------------

Testing
-------

This plugin was tested with [Jasmine BDD Framework](http://pivotal.github.com/jasmine/). To test yourself just open the spec/SpecRuner.html on your favorite web browser, it take ~0.0s.

The script was tested against:

*   Chrome 12.0.742.122
*   Safari 5.0.5
*   Firefox 5.0
*   IE 6/7/8/9

Credits
-------

*   [Edson Hilios](http://edson.hilios.com.br) Mail me: edson (at) hilios (dot) com

License
-------

Copyright (c) 2013 Edson Hilios. This is a free software is licensed under the MIT License.

