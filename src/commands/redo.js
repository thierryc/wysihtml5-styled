(function(wysihtml5) {
	"use strict";
	wysihtml5.commands.redo = {
		exec: function(composer) {
			return composer.undoManager.redo();
		},

		state: function(composer) {
			return false;
		}
	};
})(wysihtml5);

