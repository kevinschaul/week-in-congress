(function($) {

var graphic = {

  init: function(args) {
    var self = this;

    if ('height' in args) {
      self.height = args['height'];
    }
    $.support.cors = true;

    self.initTemplate();
    self.getEvents();
  },

  initTemplate: function() {
    var self = this;

    self.$templateEvent = $('#template-event');
    self.$targetEvents = $('#target-events');
    self.templateEvent = _.template(self.$templateEvent.html());
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

    _.each(data, function(d) {
      self.addEvent(d);
    });
  },

  addEvent: function(event) {
    var self = this;

    self.$targetEvents.append(self.templateEvent({ event: event }));
  }
};

$(document).ready(function() {
  var g = graphic.init({
    height: 347
  });
});

})(jQuery);

