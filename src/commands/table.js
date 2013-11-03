(function(wysihtml5) {
  var CLASS_NAME  = "wysiwyg-table-default",
      REG_EXP     = /wysiwyg-table-[0-9a-z]+/g;
  
  wysihtml5.commands.table = {
    exec: function(composer, command, value) {
      switch ( value ) {
      	case 'center':
      		return wysihtml5.commands.justifyCenter.exec(composer, "justifyCenter");
      		break;
      	case 'full':
      		return wysihtml5.commands.justifyFull.exec(composer, "justifyFull");
      		break;
      	case 'left':
      		return wysihtml5.commands.justifyLeft.exec(composer, "justifyLeft");
      		break;
      	case 'right':
      		return wysihtml5.commands.justifyRight.exec(composer, "justifyRight");
      		break;
      }
    },

    state: function(composer, command, value) {
    	switch ( value ) {
      	case 'center':
      		return wysihtml5.commands.justifyCenter.state(composer, "justifyCenter");
      		break;
      	case 'full':
      		return wysihtml5.commands.justifyFull.state(composer, "justifyFull");
      		break;
      	case 'left':
      		return wysihtml5.commands.justifyLeft.state(composer, "justifyLeft");
      		break;
      	case 'right':
      		return wysihtml5.commands.justifyRight.state(composer, "justifyRight");
      		break;
      }
    }
  };
})(wysihtml5);