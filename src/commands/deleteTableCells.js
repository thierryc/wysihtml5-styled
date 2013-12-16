(function(wysihtml5) {
	"use strict";
	wysihtml5.commands.deleteTableCells = {
		exec: function(composer, command, value) {
			if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {
				// switches start and end if start is bigger than end (reverse selection)
				var tableSelect = wysihtml5.dom.table.orderSelectionEnds(composer.tableSelection.start, composer.tableSelection.end);
				var start = tableSelect.start;
				var end = tableSelect.end;
			} else if (composer.tableSelection && composer.tableSelection.table == null && composer.selection.getSelection().isCollapsed) {
				var cell = wysihtml5.dom.getParentElement(composer.selection.getSelectedNode(), { nodeName: ['TH','TD'] });
				var start = cell;
				var end = cell;
			} else {
				return false;
			}
			
			var idx = wysihtml5.dom.table.indexOf(start),
					selCell,
					table = composer.tableSelection.table;
					
			// todo delete the complete selection not only the first one.
			wysihtml5.dom.table.removeCells(start, value);
			setTimeout(function() {
				// move selection to next or previous if not present
				selCell = wysihtml5.dom.table.findCell(table, idx);
			
				if (!selCell){
				
					if (value == "row") {
						selCell = wysihtml5.dom.table.findCell(table, {
								"row": idx.row - 1,
								"col": idx.col
						});
					}
		
					if (value == "column") {
						selCell = wysihtml5.dom.table.findCell(table, {
								"row": idx.row,
								"col": idx.col - 1
						});
					}
				} 
				if (selCell) {
					composer.tableSelection.select(selCell, selCell);
				}
			}, 0);
			
		},

		state: function(composer, command) {
				return false;
		}
	};
})(wysihtml5);

