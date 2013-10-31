(function(wysihtml5) {
  var undef,
      dom       = wysihtml5.dom;
  
	function _fullscren(composer, element){
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
		//composer.parent.fire("fullscreenEnable:composer").fire("focus");
		return true;
	}

	function _cancelFullscren(composer, element){
		wysihtml5.dom.removeClass(element, 'wysihtml5-fullscreen');
		var cancelRequestMethod = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.msCancelFullScreen;
		if (cancelRequestMethod) { // Native full screen.
				cancelRequestMethod.call(document);
		} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
			var wscript = new ActiveXObject("WScript.Shell");
			if (wscript !== null) {
					wscript.SendKeys("{F11}");
			}
		}
		//composer.parent.fire("fullscreenDisable:composer").fire("focus");
		return true;
	}

	function _isFullscren(){
		return fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	}

	wysihtml5.commands.fullscreen = {
		exec: function(composer) {
	
			var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;

			if (composer.config.editorContainer) {
				this.editorContainer = typeof(composer.config.editorContainer) === "string" ? document.getElementById(composer.config.editorContainer) : composer.config.editorContainer;
			} else {
				this.editorContainer = document.documentElement;
			}
		
			if(_isFullscren()) {
				_cancelFullscren(composer, this.editorContainer);
			} else {
				_fullscren(composer, this.editorContainer);
				var that = this;
			}
			return true;
		},

		state: function(composer) {
			return _isFullscren();
		}
	};

})(wysihtml5);



