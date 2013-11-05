(function(wysihtml5) {
  var LINE_BREAK = "<br>" + (wysihtml5.browser.needsSpaceAfterLineBreak() ? " " : "");
    
  wysihtml5.commands.insertLineBreak = {
    exec: function(composer, command) {
			if (!composer.selection.getSelection().isCollapsed) return;
		
			if (composer.commands.support(command)) {
				composer.doc.execCommand(command, false, null);
				if (!wysihtml5.browser.autoScrollsToCaret()) {
					composer.selection.scrollIntoView();
				}
			} else {
				composer.commands.exec("insertHTML", LINE_BREAK);
			}
    },

    state: function(composer, command) {
      return composer.selection.getSelection().isCollapsed;
    }
  };
})(wysihtml5);