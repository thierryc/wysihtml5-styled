wysihtml5.commands.fullscreen = {
  exec: function(composer) {

		if (composer.config.editorContainer) {
			this.editorContainer = typeof(composer.config.editorContainer) === "string" ? document.getElementById(composer.config.editorContainer) : composer.config.editorContainer;
		} else {
			this.editorContainer = document.documentElement;
		}
		console.log(this.editorContainer);
		
		wysihtml5.dom.addClass(this.editorContainer, 'wysihtml5-fullscreen');
		this._fullscren(this.editorContainer);

    /*
    if(!this._isFullscren()) {
    	
    } else {
    	this._cancelFullscren(composer);
    }
    */
    return true;
  },

  state: function(composer) {
    return false;
  },
  
  _fullscren: function(element){
  	wysihtml5.dom.addClass(element, 'wysihtml5-fullscreen');
  	var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
		if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
    return true;
  },
  
  _cancelFullscren: function(element){
  	wysihtml5.dom.removeClass(element, 'wysihtml5-fullscreen');
  	var cancelRequestMethod = element.cancelFullScreen || element.webkitCancelFullScreen || element.mozCancelFullScreen || element.msCancelFullScreen;
		if (cancelRequestMethod) { // Native full screen.
        cancelRequestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
    return true;
  },
  
  _isFullscren: function(element){
  	var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
		var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
		console.log(fullscreenElement);
		console.log(fullscreenEnabled);
		return fullscreenEnabled;
  }
  
  
};