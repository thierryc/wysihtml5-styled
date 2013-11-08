(function(wysihtml5) {
	"use strict";
  var dom 				= wysihtml5.dom,
    	CLASS_NAME  = "wysiwyg-text-align-left",
      REG_EXP     = /wysiwyg-text-align-[0-9a-z]+/g;
  
  wysihtml5.commands.justifyLeft = {
    exec: function(composer, command) {
      if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {
				var elementNodes = dom.table.getCellsBetween(composer.tableSelection.start, composer.tableSelection.end);
				for (var i = 0; i < elementNodes.length; i++) {
					dom.replaceClass(elementNodes[i], CLASS_NAME, REG_EXP);
				}
			} else {
      	return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
      }
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    }
  };
})(wysihtml5);

