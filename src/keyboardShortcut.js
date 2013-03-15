/**
 * keyboardShortcut
 *
 * @param {Object} parent Reference to instance of Editor instance
 * @param {Element} container Reference to the toolbar container element
 *
 */
(function(wysihtml5) {
  var keys                          = {
        9: { command: 'indent', value: false }, // tab
        'shift': {
            9: { command: 'outdent', value: false  } // Shift + tab
        },
        'ctrl': {
            //90: { command: 'undo', value: false }, // Ctrl + z
            77: { command: 'removeFormat', value: false }, // Ctrl + m
            //66: { command: 'bold', value: false }, // Ctrl + b
            //73: { command: 'italic', value: false }, // Ctrl + i
            74: { command: 'insertUnorderedList', value: false }, // Ctrl + j
            75: { command: 'insertOrderedList', value: false }, // Ctrl + k
            76: { command: 'superscript', value: false }, // Ctrl + k
            'shift': {
                //90: { command: 'redo', value: false } // Ctrl + Shift + z
            } 
        }
      },
      dom                           = wysihtml5.dom;
  
  wysihtml5.KeyboardShortcut = Base.extend(
    /** @scope wysihtml5.toolbar.KeyboardShortcut.prototype */ {
    constructor: function(editor) {
      this.editor     = editor;
      this.composer   = editor.composer;
      
      var that = this;
      console.log("keydown");

      // toolbar.execCommand("formatBlock", "blockquote");
      dom.observe(this.composer.element, "keydown", function(event) {
      
        var key = event.keyCode || event.which;
        var modKeys = keys;
        if (event.ctrlKey || event.metaKey) {
            modKeys = modKeys['ctrl'];
            if (event.shiftKey) {
                modKeys = modKeys['shift'];
            }
        } else if (event.shiftKey) {
            modKeys = modKeys['shift'];
        }
        
        console.log(event.ctrlKey, event.metaKey, key, modKeys);
        
        if (modKeys[key]) {
            event.preventDefault();
            
            that.editor.toolbar.execCommand(modKeys[key].command, modKeys[key].option);
            //that.toolbar.execCommand(modKeys[key].command, modKeys[key].option);
        }
      });
 
    }
  });
  
})(wysihtml5);
