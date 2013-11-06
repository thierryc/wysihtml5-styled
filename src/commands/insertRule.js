(function(wysihtml5) {
	"use strict";
  var RULE = "<hr>"; 
  wysihtml5.commands.insertRule = {
    exec: function(composer, command) {
			if (!composer.selection.getSelection().isCollapsed) return;
		
			if (composer.commands.support(command)) {
				composer.doc.execCommand(command, false, null);
				if (!wysihtml5.browser.autoScrollsToCaret()) {
					composer.selection.scrollIntoView();
				}
			} else {
				composer.commands.exec("insertHTML", RULE);
			}
    },
    
    enable: function(composer, command) {
      return composer.selection.getSelection().isCollapsed;
    },

    state: function(composer, command) {
      return false;
    }
  };
})(wysihtml5);