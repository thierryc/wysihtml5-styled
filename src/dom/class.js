(function(wysihtml5) {
	"use strict";
  var api = wysihtml5.dom;

  /**
   * Remove similiar classes (based on classRegExp)
   * and add the desired class name
   */  
  api.replaceClass = function(element, className, classRegExp) {
    if (element.className) {
      api.removeClassByRegExp(element, classRegExp);
      element.className = wysihtml5.lang.string(element.className + " " + className).trim();
    } else {
      element.className = className;
    }
  };
  
  api.removeClassByRegExp = function(element, classRegExp) {
    var result = classRegExp.test(element.className);
    element.className = element.className.replace(classRegExp, "");
    if (wysihtml5.lang.string(element.className).trim() == '') {
        element.removeAttribute('class');
    }
  };
  
  api.addClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.add(className);
    }
    if (api.hasClass(element, className)) {
      return;
    }
    element.className += " " + className;
  };
  
  api.removeClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.remove(className);
    }
    
    element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ");
  };
  
  api.hasClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.contains(className);
    }
    
    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  };
  
  api.removeClassByPrefix = function(element, classNamePrefix) {
    var classList = element.classList;
    if (classList) {
        var reg = new RegExp("(^" + classNamePrefix + ")")
        for (var i = 0; i < classList.length; i++ ) {
        	if (reg.test(classList.item(i))){
        	    var classString = classList.item(i).toString();
        	    classList.remove(classString);
        	}
        }
        return classList;
    }
    // make idem for html4 navigator
    
    //var elementClassName = element.className;
    //return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  };
  
})(wysihtml5);
