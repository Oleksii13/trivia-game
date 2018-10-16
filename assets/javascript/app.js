$("document").ready(function() {
  var time = 10;
  var condition = true;
  var display=$("#display");

  var timeCount = setInterval(function() {
    if (condition) {
      time--;

      $("#demo").html(time);

      if (time == 0) {
          condition=false;
          clearInterval(timeCount);
          display.html("<p>You are looser!</p>");
      }
    }
  }, 1000);
});
