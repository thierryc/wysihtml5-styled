(function(wysihtml5) {
	"use strict";
  var dom                     = wysihtml5.dom,
      // Following elements are grouped
      // when the caret is within a H1 and the H4 is invoked, the H1 should turn into H4
      // instead of creating a H4 within a H1 which would result in semantically invalid html
      BLOCK_ELEMENTS_GROUP    = ["H1", "H2", "H3", "H4", "H5", "H6", "P", "PRE", "BLOCKQUOTE", "DIV"],
      LIST_ELEMENTS_GROUP    	= ["OL", "UL", "TABLE", "DL"],
      ITEM_ELEMENTS_GROUP    	= ["LI", "TD", "TH", "DT", "DD"];
  

  /**
   * Check whether given node is a text node and whether it's empty
   */
  function _isBlankTextNode(node) {
    return node.nodeType === wysihtml5.TEXT_NODE && !wysihtml5.lang.string(node.data).trim();
  }

  /**
   * Returns previous sibling node that is not a blank text node
   */
  function _getPreviousSiblingThatIsNotBlank(node) {
    var previousSibling = node.previousSibling;
    while (previousSibling && _isBlankTextNode(previousSibling)) {
      previousSibling = previousSibling.previousSibling;
    }
    return previousSibling;
  }

  /**
   * Returns next sibling node that is not a blank text node
   */
  function _getNextSiblingThatIsNotBlank(node) {
    var nextSibling = node.nextSibling;
    while (nextSibling && _isBlankTextNode(nextSibling)) {
      nextSibling = nextSibling.nextSibling;
    }
    return nextSibling;
  }

  /**
   * Adds line breaks before and after the given node if the previous and next siblings
   * aren't already causing a visual line break (block element or <br>)
   */
  function _addLineBreakBeforeAndAfter(node) {
    var doc             = node.ownerDocument,
        nextSibling     = _getNextSiblingThatIsNotBlank(node),
        previousSibling = _getPreviousSiblingThatIsNotBlank(node);

    if (nextSibling && !_isLineBreakOrBlockElement(nextSibling)) {
      node.parentNode.insertBefore(doc.createElement("br"), nextSibling);
    }
    if (previousSibling && !_isLineBreakOrBlockElement(previousSibling)) {
      node.parentNode.insertBefore(doc.createElement("br"), node);
    }
  }

  /**
   * Removes line breaks before and after the given node
   */
  function _removeLineBreakBeforeAndAfter(node) {
    var nextSibling     = _getNextSiblingThatIsNotBlank(node),
        previousSibling = _getPreviousSiblingThatIsNotBlank(node);

    if (nextSibling && _isLineBreak(nextSibling)) {
      nextSibling.parentNode.removeChild(nextSibling);
    }
    if (previousSibling && _isLineBreak(previousSibling)) {
      previousSibling.parentNode.removeChild(previousSibling);
    }
  }

  function _removeLastChildIfLineBreak(node) {
    var lastChild = node.lastChild;
    if (lastChild && _isLineBreak(lastChild)) {
      lastChild.parentNode.removeChild(lastChild);
    }
  }

  function _isLineBreak(node) {
    return node.nodeName === "BR";
  }

  /**
   * Checks whether the elment causes a visual line break
   * (<br> or block elements)
   */
  function _isLineBreakOrBlockElement(element) {
    if (_isLineBreak(element)) {
      return true;
    }

    if (dom.getStyle("display").from(element) === "block") {
      return true;
    }

    return false;
  }

  /**
   * Execute native query command
   * and if necessary modify the inserted node's className
   */
  function _execCommand(doc, command, nodeName, className) {
    if (className) {
      var eventListener = dom.observe(doc, "DOMNodeInserted", function(event) {
        var target = event.target,
            displayStyle;
        if (target.nodeType !== wysihtml5.ELEMENT_NODE) {
          return;
        }
        displayStyle = dom.getStyle("display").from(target);
        if (displayStyle.substr(0, 6) !== "inline") {
          // Make sure that only block elements receive the given class
          target.className += " " + className;
        }
      });
    }
    doc.execCommand(command, false, nodeName);
    
    if (eventListener) {
      eventListener.stop();
    }
  }

  function _selectLineAndWrap(composer, element) {
    if (composer.selection.isCollapsed()) {
      composer.selection.selectLine();
    }
    composer.selection.surround(element);
    _removeLineBreakBeforeAndAfter(element);
    _removeLastChildIfLineBreak(element);
    composer.selection.selectNode(element, wysihtml5.browser.displaysCaretInEmptyContentEditableCorrectly());
  }

  function _hasClasses(element) {
    return !!wysihtml5.lang.string(element.className).trim();
  }
  
  wysihtml5.commands.formatBlock = {
    exec: function(composer, command, nodeName, className, classRegExp) {
      var doc             = composer.doc,
          blockElement    = this.state(composer, command, nodeName, className, classRegExp),
          blockElementGroup,
          itemElement,
          listElement,
          useLineBreaks   = composer.config.useLineBreaks,
          defaultNodeName = useLineBreaks ? "DIV" : "P",
          selectedNode, 
          classRemoveAction;

      nodeName = typeof(nodeName) === "string" ? nodeName.toUpperCase() : nodeName;
      
      // add class to many tag in range.
      if(!nodeName && className) {
      	var range = composer.selection.getRange();
				if (range) {
      		var elementNodes = range.getNodes([wysihtml5.ELEMENT_NODE], function(node) {
        		return wysihtml5.lang.array(BLOCK_ELEMENTS_GROUP).contains(node.nodeName) || wysihtml5.lang.array(ITEM_ELEMENTS_GROUP).contains(node.nodeName);
      		});
					if (elementNodes.length) {
						composer.selection.getSelection().removeAllRanges();
						for (var i = 0; i < elementNodes.length; i++) {
							dom.replaceClass(elementNodes[i], className, classRegExp);
						}
						composer.selection.setSelection(range);
						return;
					}
				}
      }
      
      if (blockElement) {
        composer.selection.executeAndRestoreSimple(function() {
          if (classRegExp) {
            classRemoveAction = dom.removeClassByRegExp(blockElement, classRegExp);
          }
          if (classRemoveAction && nodeName === null && blockElement.nodeName != defaultNodeName) {
            // dont rename or remove element when just setting block formating class
            return;
          }
          var hasClasses = _hasClasses(blockElement);
          if (!hasClasses && (useLineBreaks || nodeName === "P")) {
            // Insert a line break afterwards and beforewards when there are siblings
            // that are not of type line break or block element
            _addLineBreakBeforeAndAfter(blockElement);
            dom.replaceWithChildNodes(blockElement);
          } else {
            // Make sure that styling is kept by renaming the element to a <div> or <p> and copying over the class name
            dom.renameElement(blockElement, nodeName === "P" ? "DIV" : defaultNodeName);
          }
        });
        return;
      }
      
      // Find similiar block element and rename it (<h2 class="foo"></h2>  =>  <h1 class="foo"></h1>)
      if (nodeName === null || wysihtml5.lang.array(BLOCK_ELEMENTS_GROUP).contains(nodeName)) {
        selectedNode = composer.selection.getSelectedNode();
        itemElement = dom.getParentElement(selectedNode, {
          nodeName: ITEM_ELEMENTS_GROUP
        });
        if (itemElement) {
        	if (className) {
						dom.replaceClass(itemElement, className, classRegExp);
					}
          return;
        }
        
        listElement = dom.getParentElement(selectedNode, {
          nodeName: LIST_ELEMENTS_GROUP
        });
        if (listElement) {
          return;
        }
        
        blockElementGroup = dom.getParentElement(selectedNode, {
        	nodeName: BLOCK_ELEMENTS_GROUP
        });
        
        if (blockElementGroup == composer.element) {
            blockElementGroup = null;
        }
        
        if(blockElementGroup) blockElement = blockElementGroup;

        if (blockElement) {
          composer.selection.executeAndRestore(function() {
            // Rename current block element to new block element and add class
            if (nodeName) {
              blockElement = dom.renameElement(blockElement, nodeName);
            }
            if (className) {
            	dom.replaceClass(blockElement, className, classRegExp);
            }
          });
          return;
        }
        
      }

      // Falling back to native command for Opera up to 12 mostly
      // Native command does not create elements from selecton boundaries.
      // Not quite user expected behaviour
      if (composer.commands.support(command)) {
        _execCommand(doc, command, nodeName || defaultNodeName, className);
        return;
      }
    },

    state: function(composer, command, nodeName, className, classRegExp) {
      nodeName = typeof(nodeName) === "string" ? nodeName.toUpperCase() : nodeName;
      var selectedNode = composer.selection.getSelectedNode();
      
      return dom.getParentElement(selectedNode, {
        nodeName:     nodeName,
        className:    className,
        classRegExp:  classRegExp
      });
    }
  };
})(wysihtml5);