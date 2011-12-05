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
  
  $.unalert = {
    version: '1.0.0beta',
    settings: {
      top: '45%',
      left: '50%',
      right: null,
      bottom: null,
      width: '450px',
      height: '100px',
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
  
  function showHandler() {
  }

  function hideHandler() {
  }
  
  function alignHandler() {
  }

  function clickHandler() {
  }

  function timeoutHandler() {
  }

  function init(options) {
    // Merge the options passed wih the plugin settings
    options = $.extend({}, $.unalert.settings, options);
    return this.each(function() {
      var $this = $(this).detach(),
          $unalert = $('<div />').addClass('unalert').attr('id', 'unalert_overlay_'+(++index));
          $unalert.append($this).appendTo('body');
      // Set the internal data
      $unalert.data('index', index);
      $unalert.data('element', this);
      $unalert.data('visible', false);
      $unalert.data('options', options);
      // Style it
      $unalert.hide();
      $unalert.css('position', 'absolute');
      $unalert.css('z-index', 999999999999999);
      if(options.top)     $unalert.css('top',     options.top);
      if(options.right)   $unalert.css('right',   options.right);
      if(options.left)    $unalert.css('left',    options.left);
      if(options.bottom)  $unalert.css('bottom',  options.bottom);
      if(options.width)   $unalert.css('width',   options.width);
      if(options.height)  $unalert.css('height',  options.height);
      // Bind it to align on resize and scroll
      $(window).bind('resize.unalert', align).
                bind('scroll.unalert', align);
      $(window).resize();
      // Save reference to unalert on the elemnt
      $this.data('unalert', $unalert)
      // Add reference to the plugin
      unalerts.push($unalert);
      // Set the visibility
      if(options.visible) {
        $this.unalert('show');
      }
    });
  }

  function align() {
    var windowWidth     = $(window).width(),
        windowHeight    = $(window).height()
        windowScrollTop = $(window).scrollTop();
    // Calculate the alignment
    $.each(unalerts, function(index, $unalert) {
      var index = $unalert.data('index'),
          options = $unalert.data('options'),
          element = $unalert.data('element'),
          horizontalRatio, verticalRatio;
      // Left margin
      if(horizontalRatio = _getRatio(options.left)) {
        var leftMarginOffset = $unalert.width() * horizontalRatio * -1;
        $unalert.css('margin-left', leftMarginOffset);
      }
      // Top margin
      if(verticalRatio = _getRatio(options.top)) {
        var topOffset = windowScrollTop + windowHeight * verticalRatio,
            topMarginOffset = $unalert.height() * verticalRatio / -2;
        $unalert.css('margin-top', topMarginOffset);
        $unalert.css('top', topOffset);
      }
      // Execute the callback
      options.align.call(element);
    });
  }
  
  function show() {
    return this.each(function() {
      console.log('show');
      
      var $this = $(this),
          $unalert = $this.data('unalert');
      var index = $unalert.data('index'),
          options = $unalert.data('options');
      // Make it visible
      $unalert.show();
      $unalert.data('visible', false);
      // Bind click
      $unalert
    });
  }

  function hide() {
  }

  function click() {
  }

  function timeout() {
  }
  
  function toogle() {
  }
  
  function visible() {
  }
  
  function destroy() {
  }
  
  function update() {
  }
  
  // Methods map
  var methods = {
    init: init,
    show: show,
    hide: hide,
    align: align,
    toogle: toogle,
    visible: visible,
    destory: destroy,
    update: update
  }
  
  // Private methods
  function _getNumber(string) {
    if(string = string.replace(/[^0-9\.]/g, '')) {
      return Number(string)
    }
    return NaN
  }
  
  function _getUnit(string) {
    if(string = string.replace(/[0-9\.]+/g, '')) {
      return string;
    }
    return undefined;
  }
  
  function _isRatio(string) {
    if(string.match(/([0-9]+)\%$/g)) {
      return true;
    }
    return false;
  }

  function _getRatio(string) {
    if(_isRatio(string)) {
      return _getNumber(string) / 100;
    }
    return NaN;
  }

})(jQuery)