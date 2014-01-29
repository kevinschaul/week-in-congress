(function($) {

var graphic = {

  init: function(args) {
    var self = this;

    self.height = 400;
    if ('height' in args) {
      self.height = args['height'];
    }

    $.support.cors = true;

    self.initTemplate();
    self.getEvents();
  },

  initTemplate: function() {
    var self = this;

    self.$eventsWrapper = $('#events-wrapper');
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
    data = _.filter(data, function(d) {
      return d.whenMoment >= now;
    });

    data = _.sortBy(data, function(d) {
      return d.whenMoment;
    });

    self.$targetEvents.html('');
    var overflow = false;
    _.each(data, function(d) {

      var height = self.$eventsWrapper.height();
      if (height >= self.height) {
        overflow = true;
      }

      if (!overflow) {
        self.addEvent(d);
      }
    });

    // Remove last div which caused the overflow
    self.$targetEvents.children('div.event').last().remove();

    self.$eventsWrapper.css({
      'height': self.height,
      'overflow': 'hidden'
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

