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

    var url = 'http://s3.amazonaws.com/startribune/2014-week-in-congress/events.json';
    $.getJSON(url, function(data) {
      self.formatEvents(data);
    });
  },

  formatEvents: function(data) {
    var self = this;

    _.each(data, function(d) {
      d.whenMoment = moment.utc(d.when);
    });

    var now = moment();
    var weekFromNow = moment().add('days', 7);
    data = _.filter(data, function(d) {
      return d.whenMoment >= now && d.whenMoment <= weekFromNow;
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

