(function(wysihtml5) {
	"use strict";
	var dom 				= wysihtml5.dom;
	
	wysihtml5.commands.bold = {
		exec: function(composer, command) {
			if (composer.selection.getSelection().isCollapsed) {
				return false;
			}
			if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {
				var elementNodes = dom.table.getCellsBetween(composer.tableSelection.start, composer.tableSelection.end);
				wysihtml5.commands.formatInline.exec(composer, command, "b");
			} else {
      	return wysihtml5.commands.formatInline.exec(composer, command, "b");
      }
		},

		state: function(composer, command) {
			// element.ownerDocument.queryCommandState("bold") results:
			// firefox: only <b>
			// chrome:  <b>, <strong>, <h1>, <h2>, ...
			// ie:      <b>, <strong>
			// opera:   <b>, <strong>
			return wysihtml5.commands.formatInline.state(composer, command, "b");
		}
	};
})(wysihtml5);
