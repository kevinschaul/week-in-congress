(function($) {

var WeekInCongress = {

  init: function(args) {
    var self = this;

    var args = args || self.getURLParameters(window.location.toString());

    self.height = Math.infinity;
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
      d.whenMoment = moment.utc(d.when).tz('America/Chicago');
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
  },

  getURLParameters: function(url) {
    // http://stackoverflow.com/questions/5073859/jquery-how-to-get-parameters-of-a-url
    var result = {};
    var searchIndex = url.indexOf("?");
    if (searchIndex == -1 ) return result;
    var sPageURL = url.substring(searchIndex +1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        result[sParameterName[0]] = sParameterName[1];
    }
    return result;
  }
};

moment.tz.add({
    "zones": {
        "America/Chicago": [
            "-5:50:36 - LMT 1883_10_18_12_9_24 -5:50:36",
            "-6 US C%sT 1920 -6",
            "-6 Chicago C%sT 1936_2_1_2 -6",
            "-5 - EST 1936_10_15_2 -5",
            "-6 Chicago C%sT 1942 -6",
            "-6 US C%sT 1946 -6",
            "-6 Chicago C%sT 1967 -6",
            "-6 US C%sT"
        ]
    },
    "rules": {
        "US": [
            "1918 1919 2 0 8 2 0 1 D",
            "1918 1919 9 0 8 2 0 0 S",
            "1942 1942 1 9 7 2 0 1 W",
            "1945 1945 7 14 7 23 1 1 P",
            "1945 1945 8 30 7 2 0 0 S",
            "1967 2006 9 0 8 2 0 0 S",
            "1967 1973 3 0 8 2 0 1 D",
            "1974 1974 0 6 7 2 0 1 D",
            "1975 1975 1 23 7 2 0 1 D",
            "1976 1986 3 0 8 2 0 1 D",
            "1987 2006 3 1 0 2 0 1 D",
            "2007 9999 2 8 0 2 0 1 D",
            "2007 9999 10 1 0 2 0 0 S"
        ],
        "Chicago": [
            "1920 1920 5 13 7 2 0 1 D",
            "1920 1921 9 0 8 2 0 0 S",
            "1921 1921 2 0 8 2 0 1 D",
            "1922 1966 3 0 8 2 0 1 D",
            "1922 1954 8 0 8 2 0 0 S",
            "1955 1966 9 0 8 2 0 0 S"
        ]
    },
    "links": {}
});

$(document).ready(function() {
  var w = WeekInCongress.init();
});

})(jQuery);

