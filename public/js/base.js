(function($) {

var graphic = {

  init: function() {
    var self = this;

    $.support.cors = true;

    self.initTemplate();
    self.runTemplate();
  },

  initTemplate: function() {
    var self = this;

    self.$templateEvents = $('#template-events');
    self.$targetEvents = $('#target-events');
    self.templateEvents = _.template(self.$templateEvents.html());
  },

  runTemplate: function(data) {
    var self = this;

    self.$targetEvents.html(self.templateEvents(data));
  }
};

$(document).ready(function() {
  var g = graphic.init();
});

})(jQuery);

