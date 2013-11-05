wysihtml5.commands.insertHTML = {
  exec: function(composer, command, html) {
    // insert is not replace... ;-)
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
