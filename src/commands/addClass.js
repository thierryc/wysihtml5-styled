wysihtml5.commands.addClass = {
  exec: function(composer, command, className) {
    
  },

  state: function(composer, command, className) {
    return wysihtml5.dom.getParentElement(selectedNode, { className: className });
  }
};