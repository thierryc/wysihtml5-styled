(function(wysihtml5) {
	"use strict";
  var undef,
      NODE_NAME = "A",
      dom       = wysihtml5.dom;
  
  function _removeFormat(composer, anchors) {
    var length  = anchors.length,
        i       = 0,
        anchor,
        codeElement,
        textContent;
    for (; i<length; i++) {
      anchor      = anchors[i];
      codeElement = dom.getParentElement(anchor, { nodeName: "code" });
      textContent = dom.getTextContent(anchor);

      // if <a> contains url-like text content, rename it to <code> to prevent re-autolinking
      // else replace <a> with its childNodes
      if (textContent.match(dom.autoLink.URL_REG_EXP) && !codeElement) {
        // <code> element is used to prevent later auto-linking of the content
        codeElement = dom.renameElement(anchor, "code");
      } else {
        dom.replaceWithChildNodes(anchor);
      }
    }
  }
  
  wysihtml5.commands.removeLinkHtml5 = {
    /**
     * TODO: Use HTMLApplier or formatInline here
     *
     * Turns selection into a link
     * If selection is already a link, it removes the link and wraps it with a <code> element
     * The <code> element is needed to avoid auto linking
     * 
     * @example
     *    // either ...
     *    wysihtml5.commands.removeLinkHtml5.exec(composer, "removeLinkHtml5", "http://www.google.de");
     *    // ... or ...
     *    wysihtml5.commands.removeLinkHtml5.exec(composer, "removeLinkHtml5", { href: "http://www.google.de", target: "_blank" });
     */
    exec: function(composer, command, value) {
      var anchors = this.state(composer, command);
      if (anchors) {
        // Selection contains links
        composer.selection.executeAndRestore(function() {
          _removeFormat(composer, anchors);
        });
      } 
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatInline.state(composer, command, "A");
    }
  };
})(wysihtml5);