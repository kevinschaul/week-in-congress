(function($) {

var graphic = {

  init: function() {
    var self = this;

    $.support.cors = true;

    self.initTemplate();
    self.getEvents();
  },

  initTemplate: function() {
    var self = this;

    self.$templateEvents = $('#template-events');
    self.$targetEvents = $('#target-events');
    self.templateEvents = _.template(self.$templateEvents.html());
  },

  getEvents: function() {
    var self = this;

    var url = 'events.json';
    $.getJSON(url, function(data) {
      self.formatEvents(data);
    });
  },

  formatEvents: function(data) {
    var self = this;

    _.each(data, function(d) {
      console.log(d);
      d.whenMoment = moment.unix(d.when - 6 * 60 * 60);
    });

    var now = moment();
    var weekFromNow = now.add('days', 7);
    data = _.filter(data, function(d) {
      return d.whenMoment <= weekFromNow;
    });

    data = _.sortBy(data, function(d) {
      return d.whenMoment;
    });

    var templateData = {data: data};
    self.runTemplate(templateData);
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

