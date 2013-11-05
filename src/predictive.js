/**
 * @license 
 *
 * Query/Formatting Predictive Commands for wysihtml5
 * 
 * Author: Thierry Charbonnel (https://autreplanete.com/)
 *
 * Copyright (C) 2013 Autre planete
 * Licensed under the MIT license (MIT)
 *
 */
 /**
 * Rich Text Query/Formatting Predictive Commands
 * 
 * @example
 *    var predictive = new wysihtml5.Predictive(editor);
 */

wysihtml5.Predictive = Base.extend(
  /** @scope wysihtml5.Commands.prototype */ 
  {
  
  constructor: function(editor) {
    var defaultConfig = {
        predictiveInitLevel: 1,
        predictiveLevel: 2
    };
    this.editor    = editor;
    this.composer  = editor.composer;
    this.selection = this.composer.selection;
    this.doc       = this.composer.doc;
    this.config    = wysihtml5.lang.object({}).merge(defaultConfig).merge(editor.config).get();
  },
  
  heading: function(heading) {
    var that = this;
    var headingLevel = parseInt(heading.substring(1));
    if (headingLevel < that.config.predictiveInitLevel) return;
    var dom = wysihtml5.dom;
    var selectedNode = that.selection.getSelectedNode();
    var parentElement = dom.getParentElement(selectedNode, { nodeName: ["P", "DIV"] }, 2);
    if (parentElement) {
      that.selection.executeAndRestore(function() {
        if (that.config.useLineBreaks) {
          dom.replaceWithChildNodes(parentElement);
        } else if (parentElement.nodeName !== "") {
          var level = Math.min(that.config.predictiveLevel+1, headingLevel + 1 );
          if (level <= that.config.predictiveLevel)
            dom.renameElement(selectedNode, "H" + level);
        }
      });
    }
  }
  
});