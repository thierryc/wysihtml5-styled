(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
		// Following elements are grouped
		// when the caret is within a H1 and the H4 is invoked, the H1 should turn into H4
		// instead of creating a H4 within a H1 which would result in semantically invalid html
		BLOCK_ELEMENTS_GROUP    = ["H1", "H2", "H3", "H4", "H5", "H6", "P", "PRE", "BLOCKQUOTE", "DIV", 'TD', 'TH', 'LI'];


	wysihtml5.commands.addClass = {
		exec: function(composer, command, className) {
		
		},

		state: function(composer, command, className) {
			return wysihtml5.dom.getParentElement(selectedNode, { className: className });
		}
	};
	
})(wysihtml5);



(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
		// Following elements are grouped
		// when the caret is within a H1 and the H4 is invoked, the H1 should turn into H4
		// instead of creating a H4 within a H1 which would result in semantically invalid html
		BLOCK_ELEMENTS_GROUP    = ["SPAN", "I", "STRONG", "EM", "B"];


	wysihtml5.commands.addClassInline = {
		exec: function(composer, command, className) {
		
		},

		state: function(composer, command, className) {
			return wysihtml5.dom.getParentElement(selectedNode, { className: className });
		}
	};
})(wysihtml5);
