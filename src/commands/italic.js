(function(wysihtml5) {
	"use strict";
	wysihtml5.commands.italic = {
		exec: function(composer, command) {
			if (composer.selection.getSelection().isCollapsed) {
				return false;
			}
			return wysihtml5.commands.formatInline.exec(composer, command, "i");
		},

		state: function(composer, command) {
			// element.ownerDocument.queryCommandState("italic") results:
			// firefox: only <i>
			// chrome:  <i>, <em>, <blockquote>, ...
			// ie:      <i>, <em>
			// opera:   only <i>
			return wysihtml5.commands.formatInline.state(composer, command, "i");
		}
	};
})(wysihtml5);

