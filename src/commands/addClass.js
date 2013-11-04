(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
		// Following elements are grouped
		// when the caret is within a H1 and the H4 is invoked, the H1 should turn into H4
		// instead of creating a H4 within a H1 which would result in semantically invalid html
		BLOCK_ELEMENTS_GROUP    = ["SPAN", "I", "STRONG", "EM", "B"];

	wysihtml5.commands.addClassInline = {
		exec: function(composer, command, className) {
			return wysihtml5.commands.formatInline.exec(composer, command, 'SPAN', className, composer.config.customClassRegExp);
		},

		state: function(composer, command, className) {
			return wysihtml5.commands.formatInline.state(composer, command, 'SPAN', className, composer.config.customClassRegExp);
		}
	};
})(wysihtml5);
