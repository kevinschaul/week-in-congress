<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <title>This Week In Congress</title>

</head>
<body>

<link rel="stylesheet" href="css/base.css" />
<div id='events-wrapper'>
  <div id='target-events'>Loading ...</div>
  <a target='_blank' href='http://www.leg.state.mn.us/calendarday.aspx?jday=all'>View more events</a>
</div>
<script id='template-event' type='text/template'>
  <div class='event'>
    <span class='label'>What:</span> <%= event.description %> </br>
    <span class='label'>When:</span> <%= event.whenMoment.local().calendar() %> </br>
    <% if (event['+agenda']) { %><span class='label'>Agenda:</span> <%= event['+agenda'] %> </br><% } %>
  </div>
</script>
<script src="lib/jquery-1.10.2.min.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/underscore-min.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/moment.min.js" type="text/javascript" charset="utf-8"></script>
<script src="js/base.js" type="text/javascript" charset="utf-8"></script>

</body>
</html>

