describe("jquery.unalert", function() {
  var id = 0,
      $selector,
      callbacks = {
        show: jasmine.createSpy('showCallback'),
        hide: jasmine.createSpy('hideCallback'),
        click: jasmine.createSpy('clickCallback'),
        align: jasmine.createSpy('alignCallback'),
        timeout: jasmine.createSpy('timeoutCallback')
      };

  function createDomElement(type, message) {
    if(!type)    type = '';
    if(!message) message = '';
    return $('<div id="alert'+(++id)+'" class="flash '+type+'">'+message+'</div>').appendTo('body');
  }

  function updateSelector() {
    $selector = $('div.flash');
  }
  
  beforeEach(function() {
    createDomElement(null, 'Fake message'); // Create at least one!
    updateSelector();
    for(var k in callbacks) {
      callbacks[k].reset();
    }
  });
  
  afterEach(function() {
    updateSelector();
    $selector.unalert('destroy').remove();
  });

  it('should create the DOM used for the test', function() {
    var node = document.getElementById($selector.first().attr('id'));
    expect(node).toBeDefined();
    expect(node).not.toBeNull();
    expect($selector.length).toBe(1);
  });

  describe('class methods', function() {
    it('should have the unalert function on jquery namespace', function() {
      expect($.unalert).toBeDefined();
    });

    describe('version', function() {
      it('should return the version of the plugin as string x.x.x', function() {
        expect($.unalert.version).toBeDefined();
        expect($.unalert.version).toMatch(/^[0-9\.beta]+$/gmi)
      });
    });
    describe('settings', function() {
      it('should return the default settings object', function() {
        expect($.unalert.settings).toBeDefined();
      });
    });
    describe('defaults', function() {
      it('should set the settings into the plguin', function() {
        expect($.unalert.defaults).toBeDefined();
        $.unalert.defaults({a: 'b'})
        expect($.unalert.settings.a).toBe('b')
      });
      it('should extend the setting object not overwrite it', function() {
        $.unalert.defaults({top: 'b'});
        expect($.unalert.settings.top).toBe('b');
        expect($.unalert.settings.left).toBeDefined();
      });
    });
  });

  describe('instace methods', function() {
    it('should have the unalert function on jquery selectors namespace', function() {
      expect($.fn.unalert).toBeDefined();
    });
    
    it('should assign the unalert to any selector', function() {
      var selector = createDomElement();
      spyOn(selector, 'unalert');
      selector.unalert();
      expect(selector.unalert).toHaveBeenCalled();
    });

    describe('init', function() {
      it('should wrap the selctor node on a unalert overlay div appended to body', function() {
        $selector.unalert();
        expect($selector.parent().attr('id')).toMatch(/^unalert_overlay_[0-9]+$/);
        expect($selector.parent().parent().prop('tagName')).toBe('BODY');
      });
      it('should create a reference to the unalert div created', function() {
        $selector.unalert();
        expect($selector.data('unalert')).toBeDefined();
        expect($selector.data('unalert')).not.toBeNull();
        expect($selector.data('unalert').prop('tagName')).toBe('DIV');
      });
    });

    describe('show', function() {
      beforeEach(function() {
        $selector.unalert({show: callbacks.show, align: callbacks.align, visible: false});
      });
      it('should make the unalert overlay visible', function() {
        $selector.unalert('show');
        expect($selector.is(':visible')).toBeTruthy();
      });
      it('should execute the callback method', function() {
        $selector.unalert('show');
        expect(callbacks.show).toHaveBeenCalled();
        expect(callbacks.show.callCount).toBe(1);
      });
      it('should align everything again', function() {
        $selector.unalert('show');
        expect(callbacks.align).toHaveBeenCalled();
        // Atention! It should not align if not visible, this is why this is only called once
        expect(callbacks.align.callCount).toBe(1);
      });
    });

    describe('hide', function() {
      it('should make the unalert overlay invisible', function() {
        $selector.unalert().unalert('hide');
        expect($selector.is(':visible')).toBeFalsy();
      });
      it('should execute the callback method', function() {
        $selector.unalert({hide: callbacks.hide}).unalert('hide');
        expect(callbacks.hide).toHaveBeenCalled();
        expect(callbacks.hide.callCount).toBe(1);
      });
    });

    describe('align', function() {
      it('should execute the callback method', function() {
        $selector.unalert({align: callbacks.align});
        expect(callbacks.align).toHaveBeenCalled();
        expect(callbacks.align.callCount).toBe(1);
      });
      it('should not align if the unalert is not visible', function() {
        $selector.unalert({align: callbacks.align, visible: false});
        $selector.unalert('show');
        expect(callbacks.align).toHaveBeenCalled();
        expect(callbacks.align.callCount).toBe(1);
      });
    });

    describe('toggle', function() {
      it('should show and hide', function() {
        $selector.unalert({visible: false});
        // Should show
        $selector.unalert('toogle');
        expect($selector.is(':visible')).toBeTruthy();
        // Should hide
        $selector.unalert('toogle');
        expect($selector.is(':visible')).toBeFalsy();
      });
    });

    describe('update', function() {
      beforeEach(function() {
        $selector.unalert({align: callbacks.align});
        $selector.unalert('update', {a: 'b'});
      });
      it('should update the unalert options for this selector', function() {
        expect($selector.data('unalert').data('options').a).toBe('b')
      });
      it('should align after this', function() {
        expect(callbacks.align).toHaveBeenCalled();
        expect(callbacks.align.callCount).toBe(2); // One when starts + other when update = 2
      });
    });

    describe('destroy', function() {
      it('should remove the selector and call hide callback', function() {
        $selector.unalert({hide: callbacks.hide}).unalert('destroy');
        expect(callbacks.hide).toHaveBeenCalled();
        expect(callbacks.hide.callCount).toBe(1);
      });
    });
    describe('visible', function() {
        
      it('should return false when initiated with true visibility', function() {
        $selector.unalert({visible: true});
        expect($selector.unalert('visible')).toBeTruthy();
      });
      it('should return false when showed', function() {
        $selector.unalert({visible: false});
        $selector.unalert('show');
        expect($selector.unalert('visible')).toBeTruthy();
      });
      it('should return false when initiated with false visibility', function() {
        $selector.unalert({visible: false});
        expect($selector.unalert('visible')).toBeFalsy();
      });
      it('should return false when hided', function() {
        $selector.unalert({visible: true});
        $selector.unalert('hide');
        expect($selector.unalert('visible')).toBeFalsy();
      });
    });
  });

  describe('events callback', function() {
    describe('click', function() {
      it('should execute the callback on click', function() {
        $selector.unalert({click: callbacks.click});
        $(document).click(); // Simulating a click
        expect(callbacks.click).toHaveBeenCalled();
        expect(callbacks.click.callCount).toBe(1);
      });
    });

    describe('timeout', function() {
      it('should execute the callback method', function() {
        $selector.unalert({timeout: callbacks.timeout, timespan: 1});
        // Pay atention the timeout is async
        runs(function() {
          expect(callbacks.timeout).toHaveBeenCalled();
          expect(callbacks.timeout.callCount).toBe(1);
        });
      });
    });
  });
});