wysihtml5.commands.indent = {
	"use strict";
  exec: function(composer, command) {
    var doc           = composer.doc,
        selectedNode  = composer.selection.getSelectedNode(),
        body          = doc.getElementsByTagName('BODY')[0];
        
    if (composer.commands.support(command)) {
      doc.execCommand(command, false, null);
      composer.selection.executeAndRestore(function() {
        wysihtml5.dom.removeStyles(body);
      });
      return;
    }
    
  },
  
  state: function(composer) {
    return false;
  }
};