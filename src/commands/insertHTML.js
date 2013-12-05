(function(wysihtml5) {
	"use strict";
	wysihtml5.commands.insertHTML = {
		exec: function(composer, command, value) {
			// insert is not replace... ;-)
			var html;
			if (value && value.html) {
				html = value.html;
			} else {
				html = value;
			}
			
			if (!composer.selection.getSelection().isCollapsed) return;
			if (composer.commands.support(command)) {
				composer.doc.execCommand(command, false, html);
			} else {
				composer.selection.insertHTML(html);
			}
		},

		state: function(composer, command) {
			return composer.selection.getSelection().isCollapsed;
		}
	};
})(wysihtml5);

