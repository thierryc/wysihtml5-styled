(function(wysihtml5) {
  var api = wysihtml5.dom;
  
  api.removeStyles = function(element) {
    if(!element) return;
    if (element.tagName != 'BODY' && element.nodeType == 1) element.removeAttribute("style");
    if(element.childNodes.length > 0) {
        for(var child in element.childNodes) {
            /* filter element nodes only */
            if(element.childNodes[child].nodeType == 1)
                api.removeStyles(element.childNodes[child]);
        }
    }
  };
  
})(wysihtml5);
