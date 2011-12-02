describe("jquery.countdown", function() {
  var $selector,
      callback = jasmine.createSpy('callback');
      
  function setCountdown() {
    var toDate = arguments.length == 0 ? new Date() : arguments[0];
    $selector.countdown(toDate, callback);
  }
  
  beforeEach(function() {
    $selector = $('<div id="clock" />').appendTo('body');  
  });
  
  afterEach(function() {
    $selector.remove();
    callback.reset();
  });
  
});