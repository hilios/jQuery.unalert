(function($) {

  var alerts = [],
      settings = {top: '45%',
                  left: '50%',
                  width: '50%',
                  height: '50%',
                  show: showHandler,
                  hide: hideHandler,
                  click: clickHandler,
                  align: function() {},
                  timeout: 2 * 60 * 1000,
                  visible: true
                  }

  function init(options) {
    // Generate a brand new settings object merging the default settings with the options
    options = $.extend({}, settings, options);
    
    return this.each(function() {
      var index = alerts.length,
          $this = $(this).detach(),
          $alert = $('<div />').attr('id', 'unalert_overlay_'+index).
                                addClass('unalert').
                                append($this).
                                appendTo('body').
                                data('unalert-visible', false).
                                data('unalert-options', options);
      alerts.push($alert);
      $this.data('unalert-index', index);
      // Style it
      $alert.css('position', 'absolute');
      $alert.css('top', options.top);
      $alert.css('left', options.left);
      $alert.css('width', options.width);
      $alert.css('height', options.height);
      $alert.css('z-index', 999999999999999);
      // Alignment
      $(window).bind('resize.unalert', alignHandler).
                bind('scroll.unalert', alignHandler);
      $(window).resize();
      //
      if(options.visible) {
        $this.unalert('show');
      }
    });
  }

  function getNumber(string) {
    if(string = string.replace(/[^0-9]/g, '')) {
      return Number(string.replace(/[^0-9]/g, ''))
    }
    return NaN
  }

  function getRatio(string) {
    if(string.match(/([0-9]+)\%$/g)) {
      return getNumber(string) / 100;
    }
    return NaN;
  }

  function clickHandler(event) {
    $(this).unalert('hide');
  }

  function alignHandler() {
    var windowWidth     = $(window).width(),
        windowHeight    = $(window).height()
        windowScrollTop = $(window).scrollTop();

    $.each(alerts, function(index, $alert) {
      var options = $alert.data('unalert-options'), 
          horizontalRatio, verticalRatio;
      // Left margin
      if(horizontalRatio = getRatio(options.left)) {
        var leftMarginOffset = $alert.width() * horizontalRatio * -1;
        $alert.css('margin-left', leftMarginOffset);
      }
      // Top margin
      if(verticalRatio = getRatio(options.top)) {
        var topOffset = windowScrollTop + windowHeight * verticalRatio,
            topMarginOffset = $alert.height() * verticalRatio / -2;
        $alert.css('margin-top', topMarginOffset);
        $alert.css('top', topOffset);
      }
      // Set the callback
      options.align.call($alert);
    });
  }

  function showHandler() {
    $(this).hide().fadeIn();
  }

  function hideHandler() {
    
  }

  var methods = {
    init: init,
    show: function(delay) {
      if(!delay) {
        delay = 0;
      }
      return this.each(function() {
        var $this = $(this),
            $alert = $(this).parent(),
            options = $alert.data('unalert-options');
        if(!options) return true;
        // Callback
        options.show.apply(this, arguments);
        // Visibility
        $alert.show();
        $alert.data('unalert-visible', true);
        // Bind
        $(document).bind('click.unalert', function() {
          options.click.apply($this, arguments);
        });
        // Timeout
        if(options.timeout > 0) {
          var timeout = $alert.data('unalert-timeout');
          if(timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(function() {
           $this.unalert('hide');
          }, options.timeout);
          $this.data('unalert-timeout', timeout);
        }
      });
    },
    hide: function() {
      return this.each(function() {
        var $alert = $(this).parent(),
            options = $alert.data('unalert-options');
        if(!options) return true;
        // Callback
        options.hide.apply(this, arguments);
        // Visibility
        $alert.fadeOut();
        $alert.data('unalert-visible', false);
        // Unbind
        $(document).unbind('click.unalert');
        // Timeout
        var timeout = $alert.data('unalert-timeout');
        if(timeout) {
          clearTimeout(timeout);
        }
      });
    },
    toggle: function() {
      var $this = $(this),
          visible = $this.parent().data('unalert-visible');
      $this.unalert(visible ? 'hide' : 'show');
    },
    visible: function() {
      return $(this).parent().data('unalert-visible', false);
    },
    update: function(options) {
      var newOptions = options,
          oldOptions = $(this).parent().data('unalert-options');
      options = $.extend(oldOptions, newOptions);
      $(this).parent().data('unalert-options', options);
    },
    destroy: function() {
      var $alert = $(this).parent(),
          options = $alert.data('unalert-options');
      if(!options) return true;

      $(window).unbind('resize.unalert').unbind('scroll.unalert');
      $(document).unbind('click.unalert');
      $alert.remove();
    }
  };

  $.fn.unalert = function(method) {
    if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if(typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method %s does not exist on jQuery.tooltip'.replace(/\%s/gi, method));
    }
  };

  $.unalert = function(options) {
    $.extend(settings, options);
  };
})(jQuery);