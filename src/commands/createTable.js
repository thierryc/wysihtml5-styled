(function(wysihtml5) {
	"use strict";
  var dom = wysihtml5.dom;
  
  /**
   * Remove similiar classes (based on classRegExp)
   * and add the desired class name
   */
  function _addClass(element, className, classRegExp) {
    if (element && element.className) {
      _removeClass(element, classRegExp);
      element.className = wysihtml5.lang.string(element.className + " " + className).trim();
    } else {
      element.className = className;
    }
  }

  function _removeClass(element, classRegExp) {
    var ret = classRegExp.test(element.className);
    element.className = element.className.replace(classRegExp, "");
    if (wysihtml5.lang.string(element.className).trim() == '') {
        element.removeAttribute('class');
    }
    return ret;
  }
  
  wysihtml5.commands.createTable = {
		exec: function(composer, command, value) {
			var col, row, html;
			var selection = composer.selection.getSelection();
			if (!selection.isCollapsed) {
				selection.collapseToEnd();
			}
			if (value && value.cols && value.rows && parseInt(value.cols, 10) > 0 && parseInt(value.rows, 10) > 0) {
				var html = '<table class="wysiwyg-table"><tbody>';
				var cell = '<th>&nbsp;</th>';
				for (row = 0; row < value.rows; row ++) {
						html += '<tr>';
						for (col = 0; col < value.cols; col ++) {
								html += cell;
						}
						html += '</tr>';
						cell = '<td>&nbsp;</td>';
				}
				html += "</tbody></table>";
				composer.commands.exec("insertHTML", html);
			}
		},

		state: function(composer, command, value) {
			if(composer.config.handleTables === true) {
				/*
				var selection = composer.selection.getSelection(),
          range = selection && selection.rangeCount && selection.getRangeAt(0);
        var tables = [];
				range.getNodes([1], function(node){
					if (node.nodeName === "TABLE") { 
						tables.push(node); 
						return true;
					}
				});
				return tables.length;
				*/
				return false;
			} else {
    		return false;
    	}
		}
	};


	wysihtml5.commands.editTable = {
		exec: function(composer, command, value) {
			var selectedNode = composer.selection.getSelectedNode();
			var tableElement = dom.getParentElement(selectedNode, { nodeName: 'TABLE' });
			_addClass(tableElement, value, /wysiwyg-table-[0-9a-z]+/g);
		},

		state: function(composer, command, value) {
			//console.log(composer.config.handleTables);
    	//console.log(composer, command, value);
    	return false;
    	/* MOVE  to state */
      /*
      if (this.editor.config.handleTables) {
				editor.on("tableselect:composer", function() {
						that.container.querySelectorAll('[data-wysihtml5-hiddentools="table"]')[0].style.display = "";
				});
				editor.on("tableunselect:composer", function() {
						that.container.querySelectorAll('[data-wysihtml5-hiddentools="table"]')[0].style.display = "none";
				});
      }
      */	
		}
	};

})(wysihtml5);