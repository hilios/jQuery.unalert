describe("jquery.unalert", function() {
  var id = 0,
      $selector,
      callbacks = {
        show: jasmine.createSpy('showCallback'),
        hide: jasmine.createSpy('hideCallback'),
        click: jasmine.createSpy('clickCallback'),
        align: jasmine.createSpy('alignCallback')
      };

  function createDomElement(type, message) {
    if(type)    type = '';
    if(message) message = '';
    return $('<div id="alert'+(++id)+'" class="flash '+type+'">'+message+'</div>').appendTo('body');
  }

  function updateSelector() {
    $selector = $('div.flash');
  }
  
  beforeEach(function() {
    createDomElement(null, 'Fake message'); // Create at least one!
    updateSelector();
    
    $selector.css('background', 'red')
  });
  
  afterEach(function() {
    updateSelector();
    $selector.remove();
    // $('div.unalert').remove();
    for(var k in callbacks) {
      callbacks[k].reset();
    }
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
        $selector.unalert({visible: false});
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
    });
    describe('hide', function() {});
    describe('click', function() {});
    describe('align', function() {});
    describe('toggle', function() {});
    describe('update', function() {});
    describe('destroy', function() {});
    describe('visible', function() {});
  });
});