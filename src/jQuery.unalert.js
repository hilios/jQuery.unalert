/*
 * jQuery Un
 * http://github.com/hilios/jquery.unalert
 *
 * Copyright (c) 2011 Edson Hilios
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function($) {
  var index = 0,
      unalerts = [];

  function init(options) {
    // Merge the options passed wih the plugin settings
    options = $.extend({}, $.unalert.settings, options);
    return this.each(function() {
      var $this = $(this).detach(),
          $unalert = $('<div />').addClass('unalert').attr('id', 'unalert_overlay_'+(++index));
          $unalert.append($this).appendTo('body');
      // Set the internal data
      $unalert.data('count', index);
      $unalert.data('element', this);
      $unalert.data('visible', false);
      $unalert.data('options', options);
      // Style it
      $alert.css('position', 'absolute');
      // $alert.css('top', options.top);
      // $alert.css('left', options.left);
      // $alert.css('width', options.width);
      // $alert.css('height', options.height);
      $alert.css('z-index', 999999999999999);
      // Bind it to align into the window
      $(window).bind('resize.unalert', alignHandler).
                bind('scroll.unalert', alignHandler);
      $(window).resize();
      // Add reference to the plugin
      unalerts.push($unalert);
    });
  }

  function alignHandler() {
    var windowWidth     = $(window).width(),
        windowHeight    = $(window).height()
        windowScrollTop = $(window).scrollTop();
    // Calculate the alignment
    $.each(alerts, function(index, $alert) {
      var options = $alert.data('options'),
          element = $alert.data('element')
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
      // Execute the callback
      options.align.call(element);
    });
  }

  function showHandler() {
  }

  function hideHandler() {
  }

  function clickHandler() {
  }

  function timeoutHandler() {
  }

  var methods = {
    init: init
  }

  $.unalert = {
    version: '1.0.0beta',
    settings: {
      top: '45%',
      left: '50%',
      right: null,
      bottom: null,
      width: null,
      height: null,
      show: showHandler,
      hide: hideHandler,
      click: clickHandler,
      align: function() {},
      timeout: timeoutHandler,
      timespan: 2 * 60 * 1000,
      visible: true
    },
    defaults: function(options) {
      $.extend($.unalert.settings, options);
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
})(jQuery)