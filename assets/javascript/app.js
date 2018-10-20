$("document").ready(function() {
  var timeCount;
  var timeZero;

  var number;
  var number0;
  var number1;
  var number2;
  var myArray = [0, 1, 2];
  var time = 10;
  var condition = true;
  var count = 0;
  var win = 0;
  var loose = 0;
  var unanswered = 0;
  var stop = 0;

  var objects = [
    {
      q1: "Freddy is?",
      answer: ["Mercury", "Gregory", "Someone!"],
      correct: "Mercury"
    },
    {
      q1: "I love ...!",
      answer: ["Me", "You", "Anyone"],
      correct: "You"
    },
    {
      q1: "WEB",
      answer: ["site", "programming", "course"],
      correct: "site"
    }
  ];

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  function start() {
    number = shuffle(myArray);
    number0 = number[0];
    number1 = number[1];
    number2 = number[2];
    time = 10;

    timeCount = setInterval(function() {
      if (stop == 3) {
        condition = false;
        clearInterval(timeCount);
        $("#demo").addClass("hide");
        $("ol").addClass("hide");
        $("#read").html(
          "You loose: " +
            loose +
            " times.<br> You wins: " +
            win +
            " times.<br>Unanswered: " +
            unanswered +
            ""
        );
        $("button").removeClass("hide");
        $("button").text("Over again!");

        
      }

      if (condition) {
        $("#display").removeClass("hide");
        $("#demo").removeClass("hide");
        $("ol").removeClass("hide");
        $("#read").removeClass("hide");
        $("#read").text(objects[count].q1);
        $("#1").text(objects[count].answer[number0]);
        $("#2").text(objects[count].answer[number1]);
        $("#3").text(objects[count].answer[number2]);
        condition = false;
      }

      if (time === 0) {
        $("#demo").html(time);
        timeZero();
      }
      $("#demo").html(time);
      time--;
    }, 1000);
  }

  timeZero = function() {
    // $("#demo").html(time);
    $("#read").html(
      "Loooooooser. The right answer is " + objects[count].correct
    );
    clearInterval(timeCount);

    condition = true;
    $("ol").addClass("hide");

    stop++;
    count++;
    unanswered++;
    // time = 10;
    setTimeout(start, 2000);
  };

  $("button").click(function() {
    $("button").addClass("hide");
    time = 10;
    condition = true;
    count = 0;
    win = 0;
    loose = 0;
    unanswered = 0;
    stop = 0;

    start();
  });

  $("li").click(function() {
    var content = $(this).text();
    if (content == objects[count].correct) {
      clearInterval(timeCount);
      $("#read").html(
        "You are right. The answer is: " + objects[count].correct
      );
      $("ol").addClass("hide");

      condition = true;
      stop++;
      win++;
      count++;
      // time = 10;
      setTimeout(start, 2000);
    } else {
      clearInterval(timeCount);

      $("#read").html(
        "You are wrong. The answer is: " + objects[count].correct
      );
      $("ol").addClass("hide");

      stop++;
      loose++;
      condition = true;
      count++;
      // time = 10;
      setTimeout(start, 2000);
    }
  });
});
