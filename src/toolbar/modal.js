/**
 * Toolbar Modal
 *
 * @param {Element} link The toolbar link which causes the modal to open up
 * @param {Element} container The modal container
 *
 * @example
 *    <!-- Toolbar link -->
 *    <a data-wysihtml5-command="insertImage">insert an image</a>
 *
 *    <!-- Modal -->
 *    <div data-wysihtml5-modal="insertImage" style="display: none;">
 *      <label>
 *        URL: <input data-wysihtml5-modal-field="src" value="http://">
 *      </label>
 *      <label>
 *        Alternative text: <input data-wysihtml5-modal-field="alt" value="">
 *      </label>
 *    </div>
 *
 *    <script>
 *      var modal = new wysihtml5.toolbar.Modal(
 *        document.querySelector("[data-wysihtml5-command='insertImage']"),
 *        document.querySelector("[data-wysihtml5-modal='insertImage']")
 *      );
 *      modal.observe("save", function(attributes) {
 *        // do something
 *      });
 *    </script>
 */
(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
      CLASS_NAME_OPENED       = "wysihtml5-command-modal-opened",
      SELECTOR_FORM_ELEMENTS  = "input, select, textarea",
      SELECTOR_FIELDS         = "[data-wysihtml5-modal-field]",
      ATTRIBUTE_FIELDS        = "data-wysihtml5-modal-field";
      
  
  wysihtml5.toolbar.Modal = wysihtml5.lang.Dispatcher.extend(
    /** @scope wysihtml5.toolbar.Modal.prototype */ {
    constructor: function(link, container) {
      this.link       = link;
      this.container  = container;
    },

    _observe: function() {
      if (this._observed) {
        return;
      }
      
      var that = this,
          callbackWrapper = function(event) {
            var attributes = that._serialize();
            if (attributes == that.elementToChange) {
              that.fire("edit", attributes);
            } else {
              that.fire("save", attributes);
            }
            that.hide();
            event.preventDefault();
            event.stopPropagation();
          };
          
      dom.observe(that.link, "click", function() {
        if (dom.hasClass(that.link, CLASS_NAME_OPENED)) {
          setTimeout(function() { that.hide(); }, 0);
        }
      });

      dom.observe(this.container, "keydown", function(event) {
        var keyCode = event.keyCode;
        if (keyCode === wysihtml5.ENTER_KEY) {
          callbackWrapper(event);
        }
        if (keyCode === wysihtml5.ESCAPE_KEY) {
          that.fire("cancel");
          that.hide();
        }
      });

      dom.delegate(this.container, "[data-wysihtml5-modal-action=save]", "click", callbackWrapper);

      dom.delegate(this.container, "[data-wysihtml5-modal-action=cancel]", "click", function(event) {
        that.fire("cancel");
        that.hide();
        event.preventDefault();
        event.stopPropagation();
      });

      var formElements  = this.container.querySelectorAll(SELECTOR_FORM_ELEMENTS),
          i             = 0,
          length        = formElements.length,
          _clearInterval = function() { clearInterval(that.interval); };
      for (; i<length; i++) {
        dom.observe(formElements[i], "change", _clearInterval);
      }

      this._observed = true;
    },

    /**
     * Grabs all fields in the modal and puts them in key=>value style in an object which
     * then gets returned
     */
    _serialize: function() {
      var data    = this.elementToChange || {},
          fields  = this.container.querySelectorAll(SELECTOR_FIELDS),
          length  = fields.length,
          i       = 0;
      for (; i<length; i++) {
        data[fields[i].getAttribute(ATTRIBUTE_FIELDS)] = fields[i].value;
      }
      return data;
    },

    /**
     * Takes the attributes of the "elementToChange"
     * and inserts them in their corresponding modal input fields
     * 
     * Assume the "elementToChange" looks like this:
     *    <a href="http://www.google.com" target="_blank">foo</a>
     *
     * and we have the following modal:
     *    <input type="text" data-wysihtml5-modal-field="href" value="">
     *    <input type="text" data-wysihtml5-modal-field="target" value="">
     * 
     * after calling _interpolate() the modal will look like this
     *    <input type="text" data-wysihtml5-modal-field="href" value="http://www.google.com">
     *    <input type="text" data-wysihtml5-modal-field="target" value="_blank">
     *
     * Basically it adopted the attribute values into the corresponding input fields
     *
     */
    _interpolate: function(avoidHiddenFields) {
      var field,
          fieldName,
          newValue,
          focusedElement = document.querySelector(":focus"),
          fields         = this.container.querySelectorAll(SELECTOR_FIELDS),
          length         = fields.length,
          i              = 0;
      for (; i<length; i++) {
        field = fields[i];
        
        // Never change elements where the user is currently typing in
        if (field === focusedElement) {
          continue;
        }
        
        // Don't update hidden fields
        // See https://github.com/xing/wysihtml5/pull/14
        if (avoidHiddenFields && field.type === "hidden") {
          continue;
        }
        
        fieldName = field.getAttribute(ATTRIBUTE_FIELDS);
        newValue  = this.elementToChange ? (this.elementToChange[fieldName] || "") : field.defaultValue;
        field.value = newValue;
      }
    },
    
    /**
     * Show the modal opener element
     */
    show: function(elementToChange) {
      
      if (dom.hasClass(this.link, CLASS_NAME_OPENED)) {
        return;
      }
      var that        = this,
          firstField  = this.container.querySelector(SELECTOR_FORM_ELEMENTS);
      this.elementToChange = elementToChange;

      dom.addClass(this.link, CLASS_NAME_OPENED);
      if($ && $('#'+this.container.id)) {
        $('#'+this.container.id).modal('show')
        .on('show', function(){
        
        })
        .on('shown', function(){
            that._observe();
            that._interpolate();
            if (elementToChange) {
                that._interpolate(true);
                // that.interval = setInterval(function() { that._interpolate(true); }, 500);
            }
            if (firstField && !elementToChange) {
                try {
                  firstField.focus();
                } catch(e) {}
            }
        });
      } else {
        console.log('add jquery dependance');
      }
      this.fire("show");
    },
    
    /**
     * Hide the modal opener element
     */
    hide: function() {
      clearInterval(this.interval);
      this.elementToChange = null;
      dom.removeClass(this.link, CLASS_NAME_OPENED);
      //this.container.style.display = "none";
      
      if($ && $('#'+this.container.id)){
        $('#'+this.container.id).modal('hide');
      } else {
        console.log('add jquery dependance');
      }
      this.fire("hide");
    }
    
  });
})(wysihtml5);
