(function(wysihtml5) {
  var api = wysihtml5.dom;
  
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
