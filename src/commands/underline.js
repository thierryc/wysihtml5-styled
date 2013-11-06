(function(wysihtml5) {
	"use strict";
	wysihtml5.commands.underline = {
		exec: function(composer, command) {
			return wysihtml5.commands.formatInline.exec(composer, command, "u");
		},

		state: function(composer, command) {
			return wysihtml5.commands.formatInline.state(composer, command, "u");
		}
	};
})(wysihtml5);

